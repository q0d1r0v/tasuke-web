#!/usr/bin/env node
/**
 * `npm start` — serves the production build on a port that is actually free.
 *
 * `next start` defaults to 3000, which every other Node tool on a shared box
 * also wants, and it cannot pick a port itself (`-p 0` is rejected). So:
 *
 *   1. `PORT=8080 npm start`  → exactly that port; exits if it is taken.
 *   2. otherwise the port saved in `.port` by the last run, if still free —
 *      so an nginx `proxy_pass` or a bookmark keeps working across restarts;
 *   3. otherwise a random free port in 20000–39999, saved to `.port`.
 *
 * Host: `HOST=127.0.0.1 npm start` to accept connections only through a
 * reverse proxy. The default, 0.0.0.0, is reachable by IP:port from the LAN.
 * (Not `HOSTNAME`: many shells and Docker set it to the machine's name.)
 */
import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const PORT_FILE = path.join(ROOT, ".port");
const NEXT_BIN = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
const HOST = process.env.HOST?.trim() || "0.0.0.0";
const RANGE = { min: 20000, max: 39999 };
const MAX_LAUNCHES = 5;

function isFree(port) {
  return new Promise((resolve) => {
    const probe = net.createServer();
    probe.unref();
    probe.once("error", () => resolve(false));
    probe.listen({ port, host: HOST, exclusive: true }, () => probe.close(() => resolve(true)));
  });
}

function savedPort() {
  if (!existsSync(PORT_FILE)) return null;
  const port = Number.parseInt(readFileSync(PORT_FILE, "utf8").trim(), 10);
  return port >= 1024 && port <= 65535 ? port : null;
}

async function randomFreePort(exclude) {
  for (let attempt = 0; attempt < 200; attempt++) {
    const port = RANGE.min + Math.floor(Math.random() * (RANGE.max - RANGE.min + 1));
    if (!exclude.has(port) && (await isFree(port))) return port;
  }
  throw new Error(`no free port found in ${RANGE.min}–${RANGE.max}`);
}

function urls(port) {
  if (HOST !== "0.0.0.0" && HOST !== "::") return [`http://${HOST}:${port}`];
  // Container bridges (docker0, br-…, veth…) are not reachable from other machines.
  const lan = Object.entries(os.networkInterfaces())
    .filter(([name]) => !/^(docker|br-|veth|virbr|cni|flannel)/.test(name))
    .flatMap(([, list]) => list ?? [])
    .filter((i) => i.family === "IPv4" && !i.internal)
    .map((i) => `http://${i.address}:${port}`);
  return [`http://localhost:${port}`, ...lan];
}

/**
 * Runs `next start` and resolves with its exit code. `addressInUse` is set
 * when the port was taken between the probe and Next's own listen — a real,
 * if rare, race on a busy server.
 */
function runNext(port) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [NEXT_BIN, "start", "-p", String(port), "-H", HOST], {
      cwd: ROOT,
      env: { ...process.env, PORT: String(port) },
      stdio: ["inherit", "pipe", "pipe"],
    });
    let addressInUse = false;
    const pipe = (from, to) =>
      from.on("data", (chunk) => {
        if (String(chunk).includes("EADDRINUSE")) addressInUse = true;
        to.write(chunk);
      });
    pipe(child.stdout, process.stdout);
    pipe(child.stderr, process.stderr);

    const forward = (signal) => child.kill(signal);
    for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) process.on(signal, forward);

    child.on("exit", (code, signal) => {
      for (const s of ["SIGINT", "SIGTERM", "SIGHUP"]) process.off(s, forward);
      resolve({ code: code ?? (signal ? 1 : 0), addressInUse });
    });
  });
}

if (!existsSync(path.join(ROOT, ".next", "BUILD_ID"))) {
  console.error("No production build found. Run `npm run build` first.");
  process.exit(1);
}

const explicit = process.env.PORT?.trim();
const tried = new Set();

for (let launch = 1; launch <= MAX_LAUNCHES; launch++) {
  let port;
  if (explicit) {
    port = Number.parseInt(explicit, 10);
    if (!(port >= 1 && port <= 65535)) {
      console.error(`PORT=${explicit} is not a valid port.`);
      process.exit(1);
    }
    if (!(await isFree(port))) {
      console.error(
        `Port ${port} is already in use on ${HOST}. Pick another, or unset PORT for a free one.`,
      );
      process.exit(1);
    }
  } else {
    const saved = savedPort();
    port =
      saved && !tried.has(saved) && (await isFree(saved)) ? saved : await randomFreePort(tried);
    writeFileSync(PORT_FILE, `${port}\n`);
  }
  tried.add(port);

  console.log(`\n  Tasuke web → ${urls(port).join("\n               ")}\n`);
  const { code, addressInUse } = await runNext(port);

  if (addressInUse && !explicit) {
    console.warn(`Port ${port} was taken just before start — trying another.`);
    continue;
  }
  process.exit(code);
}

console.error(`Gave up after ${MAX_LAUNCHES} attempts.`);
process.exit(1);
