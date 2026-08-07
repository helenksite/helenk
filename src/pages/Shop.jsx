import React from "react";
import { COLOR, SectionEyebrow, CATEGORIES, ProductCard } from "../shared";
import { useStore } from "../store";

export default function Shop() {
  const {
    activeCategory, setActiveCategory, filteredProducts, productsLoading,
    addToCart, whatsappOrderLink, wishlist, toggleWishlist,
  } = useStore();

  return (
    <>
      {/* ---------------- SHOP ---------------- */}
      <section id="shop" style={{ padding: "60px 20px 20px", maxWidth: 1180, margin: "0 auto" }}>
        <SectionEyebrow>Shop</SectionEyebrow>
        <h2 style={{ textAlign: "center", fontFamily: "Georgia, serif", fontSize: 30, margin: "0 0 28px" }}>
          Our Products
        </h2>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 34, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: 22,
                border: `1.5px solid ${activeCategory === cat ? COLOR.red : COLOR.line}`,
                background: activeCategory === cat ? COLOR.red : "#fff",
                color: activeCategory === cat ? "#fff" : COLOR.ink,
                fontWeight: 600,
                fontSize: 13.5,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              whatsappLink={whatsappOrderLink}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
        {productsLoading && (
          <p style={{ textAlign: "center", color: COLOR.inkSoft, padding: "20px 0" }}>Loading products…</p>
        )}
        {!productsLoading && filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", color: COLOR.inkSoft, padding: "40px 0" }}>No products match your search.</p>
        )}
      </section>

    </>
  );
}
