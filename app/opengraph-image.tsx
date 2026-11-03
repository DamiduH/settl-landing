import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";

export const alt = "Settl: Your work adds up. Settl makes it count.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/@fontsource/plus-jakarta-sans/files");

/** Reads the fonts and screenshot once at build time, as base64 strings. */
async function loadAssets() {
  "use cache";
  cacheLife("max");

  const files = await Promise.all([
    readFile(join(fontDir, "plus-jakarta-sans-latin-700-normal.woff")),
    readFile(join(fontDir, "plus-jakarta-sans-latin-800-normal.woff")),
    readFile(join(process.cwd(), "public/images/hero-app.jpg")),
  ]);
  return files.map((f) => f.toString("base64"));
}

export default async function OpengraphImage() {
  const [boldB64, heavyB64, shotB64] = await loadAssets();
  const bold = Buffer.from(boldB64, "base64");
  const heavy = Buffer.from(heavyB64, "base64");
  const shotSrc = `data:image/jpeg;base64,${shotB64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(180deg, #DCEAFF 0%, #EEF5FF 55%, #F7FAFF 100%)",
          fontFamily: "Jakarta",
          color: "#0F1B3D",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(#B9CFF2 1.6px, transparent 1.8px)",
            backgroundSize: "24px 24px",
            opacity: 0.8,
          }}
        />
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginTop: 56 }}>
          <div style={{ width: 14, height: 46, background: "#062656", borderRadius: 2 }} />
          <div style={{ width: 20, height: 70, background: "#004FC5", borderRadius: 2 }} />
          <div style={{ width: 26, height: 96, background: "#3976D2", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: "-0.045em", marginTop: 26, lineHeight: 1 }}>
          Your work adds up.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            marginTop: 8,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(90deg, #3976D2, #004FC5, #062656)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Settl makes it count.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 44,
            width: 960,
            borderRadius: 22,
            overflow: "hidden",
            border: "1px solid #DCE7FA",
            background: "#fff",
            boxShadow: "0 40px 80px -30px rgba(6,38,86,.45)",
          }}
        >
          <div style={{ display: "flex", gap: 8, padding: "14px 18px", background: "#F3F6FC" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#FF5F57" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#FEBC2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#28C840" }} />
          </div>
          <img src={shotSrc} width={960} height={422} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: bold, weight: 700, style: "normal" },
        { name: "Jakarta", data: heavy, weight: 800, style: "normal" },
      ],
    },
  );
}
