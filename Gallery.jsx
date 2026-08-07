import React from "react";
import { COLOR, SectionEyebrow } from "../shared";

export default function Gallery() {
  return (
    <>
      {/* ---------------- GALLERY ---------------- */}
      <section id="gallery" style={{ padding: "70px 20px", maxWidth: 1180, margin: "0 auto" }}>
        <SectionEyebrow>Gallery</SectionEyebrow>
        <h2 style={{ textAlign: "center", fontFamily: "Georgia, serif", fontSize: 30, margin: "0 0 30px" }}>
          Moments &amp; Collections
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
          {["🌺", "🥐", "👠", "💍", "🥥", "👜", "⌚", "🎀", "🌾", "🕶️", "✨", "🎁"].map((icon, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: 8,
                background: i % 3 === 0 ? COLOR.green : i % 3 === 1 ? COLOR.red : COLOR.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                opacity: 0.9,
              }}
            >
              {icon}
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", color: COLOR.inkSoft, fontSize: 13, marginTop: 16 }}>
          Replace these placeholders with real product and customer-order photos.
        </p>
      </section>

    </>
  );
}
