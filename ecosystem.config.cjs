/**
 * PM2 process definition for a VPS.
 *
 *   git pull && npm ci && NEXT_PUBLIC_SITE_URL=https://your-domain npm run build
 *   pm2 start ecosystem.config.cjs && pm2 save      # first time
 *   pm2 restart tasuke-web                          # after later deploys
 *
 * scripts/start.mjs picks a free port and keeps it in `.port`, so the port is
 * stable across restarts: `cat .port` once, and point nginx at it. Set PORT
 * below instead if you want to choose it yourself.
 *
 * Fork mode, one instance: start.mjs is a small supervisor around `next start`,
 * and a static site needs no more.
 */
module.exports = {
  apps: [
    {
      name: "tasuke-web",
      cwd: __dirname,
      script: "scripts/start.mjs",
      exec_mode: "fork",
      instances: 1,
      max_memory_restart: "384M",
      env: {
        NODE_ENV: "production",
        // Loopback: reachable only through nginx. Use "0.0.0.0" to open IP:port.
        HOST: "127.0.0.1",
        // PORT: "8731",
      },
    },
  ],
};
