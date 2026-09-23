import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Tasuke AI — Speak it. It becomes a task.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card, drawn at build time. Text only plus the brand mark — no
 * fake UI, no ratings. Inter is bundled (src/app/_fonts, OFL) because the
 * renderer's built-in font has a single weight and cannot read variable fonts.
 */
export default async function OpenGraphImage() {
  const fontDir = path.join(process.cwd(), "src", "app", "_fonts");
  const [bold, extraBold] = await Promise.all([
    readFile(path.join(fontDir, "Inter-700.woff")),
    readFile(path.join(fontDir, "Inter-800.woff")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "radial-gradient(circle at 88% 8%, rgba(79,166,254,0.32), rgba(79,166,254,0) 45%), linear-gradient(180deg, #F5F9FF 0%, #FFFFFF 70%)",
        color: "#0B1B33",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="72" height="72" viewBox="0 0 512 512">
          <defs>
            <linearGradient id="g" x1="64" y1="32" x2="448" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4FA6FE" />
              <stop offset="1" stopColor="#2B75FA" />
            </linearGradient>
          </defs>
          <rect x="16" y="16" width="480" height="480" rx="120" fill="url(#g)" />
          <path
            d="M128 270C145 270 157 252 169 230L205 165C218 142 249 144 260 168L306 287C314 307 339 311 352 294L386 249"
            stroke="#fff"
            strokeWidth="38"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Tasuke AI</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02 }}>
          Speak it.
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.02,
            color: "#1A6BEF",
          }}
        >
          It becomes a task.
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, fontSize: 28, fontWeight: 700, color: "#4A5B78" }}>
        <span>Voice to tasks</span>
        <span style={{ color: "#A9CBFF" }}>•</span>
        <span>Works offline</span>
        <span style={{ color: "#A9CBFF" }}>•</span>
        <span>No account</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
