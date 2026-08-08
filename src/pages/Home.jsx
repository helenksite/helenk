import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ChevronRight } from "lucide-react";
import { COLOR, ProductRow } from "../shared";
import { useStore } from "../store";

// Imported images from src/assets
import zoboImg from "../assets/zobo.jpg";
import tigernutImg from "../assets/tigernut.jpg";
import kunuImg from "../assets/kunu.jpg";
import wrapperImg from "../assets/wrapper-green-floral.jpg";

export default function Home() {
  const { WHATSAPP_NUMBER, featuredProducts, bestSellers, newArrivals, addToCart, whatsappOrderLink, wishlist, toggleWishlist } = useStore();

  const COLLAGE = [
    { img: zoboImg, label: "Zobo Drink", top: "0%", left: "8%", w: 150, rotate: -6 },
    { img: tigernutImg, label: "Tigernut Drink", top: "6%", left: "56%", w: 140, rotate: 5 },
    { img: wrapperImg, label: "Stylish Wrapper", top: "48%", left: "0%", w: 150, rotate: 4 },
    { img: kunuImg, label: "Kunu Drink", top: "52%", left: "54%", w: 150, rotate: -4 },
  ];

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section
        id="home"
        style={{
          background: `linear-gradient(180deg, ${COLOR.ivory} 0%, #fff 100%)`,
          padding: "56px 20px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
          className="hk-hero-grid"
        >
          <div>
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: COLOR.green,
                background: "rgba(11,110,79,0.08)",
                padding: "5px 12px",
                borderRadius: 20,
                marginBottom: 18,
                textTransform: "uppercase",
              }}
            >
              Freshly Made • Freshly Styled
            </div>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(34px, 4.6vw, 54px)",
                lineHeight: 1.08,
                margin: "0 0 18px",
                color: COLOR.ink,
              }}
            >
              Refreshing Drinks, Delicious Treats{" "}
              <span style={{ color: COLOR.red }}>&amp; Stylish Fashion</span>
            </h1>
            <p style={{ fontSize: 16.5, color: COLOR.inkSoft, lineHeight: 1.65, marginBottom: 28, maxWidth: 460 }}>
              Helen K brings you naturally made zobo, tigernut and kunu drinks, fresh-baked buns, and
              beautiful accessories for every woman — quality, style and satisfaction, delivered.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link
                to="/shop"
                style={{
                  background: COLOR.red,
                  color: "#fff",
                  textDecoration: "none",
                  padding: "13px 26px",
                  borderRadius: 30,
                  fontWeight: 600,
                  fontSize: 14.5,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Shop Now <ChevronRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  border: `1.5px solid ${COLOR.green}`,
                  color: COLOR.green,
                  textDecoration: "none",
                  padding: "12px 24px",
                  borderRadius: 30,
                  fontWeight: 600,
                  fontSize: 14.5,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Scrapbook-style image collage using real images from src/assets */}
          <div style={{ position: "relative", height: 340 }} className="hk-hero-collage">
            {COLLAGE.map((c, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: c.top,
                  left: c.left,
                  width: c.w,
                  transform: `rotate(${c.rotate}deg)`,
                  background: "#fff",
                  border: `4px solid #fff`,
                  boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 120,
                    borderRadius: "2px 2px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f6f6f6",
                  }}
                >
                  <img
                    src={c.img}
                    alt={c.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "8px 4px", textAlign: "center", fontSize: 12.5, fontWeight: 600, color: COLOR.ink }}>
                  {c.label}
                </div>
              </div>
            ))}
            <span
              style={{
                position: "absolute",
                bottom: -6,
                right: 10,
                background: COLOR.gold,
                color: COLOR.ink,
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: 20,
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              ★ Trusted by 500+ customers
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- HIGHLIGHTS: Featured / Best Sellers / New Arrivals ---------------- */}
      {(featuredProducts.length > 0 || bestSellers.length > 0 || newArrivals.length > 0) && (
        <section style={{ padding: "10px 20px 0", maxWidth: 1180, margin: "0 auto" }}>
          {featuredProducts.length > 0 && (
            <ProductRow
              title="Featured Products"
              items={featuredProducts}
              onAdd={addToCart}
              whatsappLink={whatsappOrderLink}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          )}
          {bestSellers.length > 0 && (
            <ProductRow
              title="Best Sellers"
              items={bestSellers}
              onAdd={addToCart}
              whatsappLink={whatsappOrderLink}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          )}
          {newArrivals.length > 0 && (
            <ProductRow
              title="New Arrivals"
              items={newArrivals}
              onAdd={addToCart}
              whatsappLink={whatsappOrderLink}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          )}
        </section>
      )}
    </>
  );
}
