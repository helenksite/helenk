import React from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { COLOR, SectionEyebrow } from "../shared";
import { useStore } from "../store";

export default function Contact() {
  const { PHONE, EMAIL, ADDRESS, FACEBOOK_URL, INSTAGRAM_HANDLE } = useStore();
  return (
    <>
      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" style={{ padding: "70px 20px", maxWidth: 1180, margin: "0 auto" }}>
        <SectionEyebrow>Contact Us</SectionEyebrow>
        <h2 style={{ textAlign: "center", fontFamily: "Georgia, serif", fontSize: 30, margin: "0 0 30px" }}>
          Get In Touch
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
          {[
            { icon: <Phone size={18} color={COLOR.red} />, label: "Phone / WhatsApp", value: PHONE },
            { icon: <Mail size={18} color={COLOR.red} />, label: "Email", value: EMAIL },
            { icon: <MapPin size={18} color={COLOR.red} />, label: "Address", value: ADDRESS },
            {
              icon: <Instagram size={18} color={COLOR.red} />,
              label: "Social",
              value: (
                <>
                  <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" style={{ color: COLOR.ink, textDecoration: "underline" }}>
                    Facebook
                  </a>
                  {" · Instagram "}
                  {INSTAGRAM_HANDLE}
                </>
              ),
            },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 16, border: `1px solid ${COLOR.line}`, borderRadius: 10 }}>
              <div style={{ marginTop: 2 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: COLOR.inkSoft, marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
