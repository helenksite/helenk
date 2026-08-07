import React from "react";
import { COLOR, SectionEyebrow } from "../shared";

export default function About() {
  return (
    <>
      {/* ---------------- ABOUT ---------------- */}
      <section id="about" style={{ background: COLOR.ivory, padding: "70px 20px", marginTop: 60 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <SectionEyebrow>About Us</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 30, margin: "0 0 18px" }}>The Helen K Story</h2>
          <p style={{ fontSize: 16, color: COLOR.inkSoft, lineHeight: 1.75 }}>
            Helen K is a trusted lifestyle brand offering freshly made natural drinks, delicious snacks,
            and fashionable accessories for women. Every bottle of zobo, tigernut and kunu is prepared
            under hygienic conditions using carefully selected ingredients — while our fashion collection
            is chosen to help every woman look elegant and confident. Whether you're buying for yourself,
            your family, or as a gift, Helen K is your one-stop destination.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 18, marginTop: 40 }}>
            {[
              ["Fresh & Hygienic", "Small batches, quality ingredients"],
              ["Trendy & Affordable", "Fashion for every budget"],
              ["Fast Delivery", "Where available, nationwide"],
              ["Bulk & Events", "Party packs and corporate orders"],
            ].map(([title, sub]) => (
              <div key={title} style={{ background: "#fff", borderRadius: 10, padding: "20px 14px", border: `1px solid ${COLOR.line}` }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 6, color: COLOR.red }}>{title}</div>
                <div style={{ fontSize: 13, color: COLOR.inkSoft }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
