import React from "react";
import { Star } from "lucide-react";
import { COLOR, SectionEyebrow } from "../shared";
import { useStore } from "../store";

export default function Reviews() {
  const { TESTIMONIALS } = useStore();
  return (
    <>
      {/* ---------------- REVIEWS ---------------- */}
      <section id="reviews" style={{ background: COLOR.ivory, padding: "70px 20px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <SectionEyebrow>Customer Reviews</SectionEyebrow>
          <h2 style={{ textAlign: "center", fontFamily: "Georgia, serif", fontSize: 30, margin: "0 0 30px" }}>
            What Our Customers Say
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 24, border: `1px solid ${COLOR.line}` }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={14} fill={COLOR.gold} color={COLOR.gold} />
                  ))}
                </div>
                <p style={{ fontSize: 14.5, color: COLOR.ink, lineHeight: 1.6, marginBottom: 14 }}>"{t.text}"</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLOR.red }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
