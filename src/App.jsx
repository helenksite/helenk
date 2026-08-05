import React, { useState, useMemo, useEffect } from "react";
import { ShoppingBag, X, Plus, Minus, MessageCircle, Search, Menu, MapPin, Phone, Mail, Instagram, Facebook, Check, ChevronRight, Star, Heart } from "lucide-react";

// ---------------------------------------------------------------------------
// Brand tokens
// ---------------------------------------------------------------------------
const COLOR = {
  red: "#A61E22",
  redDark: "#7E1519",
  green: "#0B6E4F",
  greenDark: "#08543C",
  gold: "#C9A227",
  goldLight: "#E4C458",
  ivory: "#FBF6EE",
  ink: "#2A211D",
  inkSoft: "#6B5D54",
  line: "#E9DFCF",
};

const WHATSAPP_NUMBER = "2348000000000"; // placeholder — replace with real WhatsApp number
const PHONE = "+234 800 000 0000"; // placeholder
const EMAIL = "hello@helenk.example"; // placeholder
const ADDRESS = "Shop 4, Market Road, Enugu, Nigeria"; // placeholder

// Replace with your own Paystack PUBLIC key (starts with pk_test_ or pk_live_).
// Get one free at https://dashboard.paystack.com after creating an account.
// NEVER put a secret key (sk_...) in front-end code — only the public key belongs here.
const PAYSTACK_PUBLIC_KEY = "pk_test_replace_with_your_public_key";

// Set this to your deployed backend's URL (see helen-k-backend/README.md).
// Left blank, the storefront falls back to the hardcoded product list below
// and skips server-side order saving / payment verification.
const API_BASE_URL = ""; // e.g. "https://helenk-api.up.railway.app"

// ---------------------------------------------------------------------------
// Product data — used as a fallback if API_BASE_URL isn't set or the
// backend can't be reached. Once the backend is live, products load from
// GET /api/products instead, so this list and the database can drift
// without breaking the site — but keep them in sync when you can.
// ---------------------------------------------------------------------------
const FALLBACK_PRODUCTS = [
  {
    id: "zobo",
    name: "Zobo Drink",
    category: "Drinks",
    tag: "Best Seller",
    featured: true,
    desc: "Chilled hibiscus zobo, naturally spiced with ginger, pineapple and cloves. No preservatives.",
    icon: "🌺",
    sizes: [
      { label: "50cl", price: 800 },
      { label: "1 Litre", price: 1400 },
      { label: "5 Litres (Party Pack)", price: 6000 },
    ],
  },
  {
    id: "tigernut",
    name: "Tigernut Drink",
    category: "Drinks",
    tag: "Best Seller",
    desc: "Creamy tigernut milk (kunun aya), blended fresh with dates and coconut. A natural energy boost.",
    icon: "🥥",
    sizes: [
      { label: "50cl", price: 900 },
      { label: "1 Litre", price: 1600 },
      { label: "5 Litres (Party Pack)", price: 7000 },
    ],
  },
  {
    id: "kunu",
    name: "Kunu Drink",
    category: "Drinks",
    tag: "New",
    desc: "Traditional millet & ginger kunu — smooth, lightly spiced, and refreshingly wholesome.",
    icon: "🌾",
    sizes: [
      { label: "50cl", price: 700 },
      { label: "1 Litre", price: 1300 },
      { label: "5 Litres (Party Pack)", price: 5500 },
    ],
  },
  {
    id: "buns",
    name: "Special Buns",
    category: "Snacks",
    tag: "Best Seller",
    desc: "Soft, lightly sweet, freshly baked buns — perfect with a cold zobo or on their own.",
    icon: "🥐",
    sizes: [
      { label: "Pack of 6", price: 1200 },
      { label: "Pack of 12", price: 2200 },
      { label: "Party Tray (30pcs)", price: 5000 },
    ],
  },
  {
    id: "shoes",
    name: "Ladies' Shoes",
    category: "Fashion",
    tag: "New Arrival",
    featured: true,
    desc: "Elegant everyday heels and flats, chosen for comfort and standout style.",
    icon: "👠",
    sizes: [{ label: "One Price", price: 15000 }],
  },
  {
    id: "handbags",
    name: "Handbags",
    category: "Fashion",
    tag: null,
    desc: "Structured and slouch totes in versatile shades to complete any outfit.",
    icon: "👜",
    sizes: [{ label: "One Price", price: 18000 }],
  },
  {
    id: "watches",
    name: "Wristwatches",
    category: "Fashion",
    tag: null,
    desc: "Classic and modern faces for a polished, put-together look.",
    icon: "⌚",
    sizes: [{ label: "One Price", price: 12000 }],
  },
  {
    id: "jewelry",
    name: "Jewelry Set",
    category: "Fashion",
    tag: "Gift Set",
    featured: true,
    desc: "Necklace, earrings & bracelet sets — the finishing touch for any occasion.",
    icon: "💍",
    sizes: [{ label: "One Price", price: 9500 }],
  },
  {
    id: "earrings",
    name: "Earrings",
    category: "Fashion",
    tag: null,
    desc: "Statement and everyday studs and drops in gold and silver tones.",
    icon: "✨",
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "sunglasses",
    name: "Sunglasses",
    category: "Fashion",
    tag: null,
    desc: "UV-protective frames in trending shapes — sun-ready and stylish.",
    icon: "🕶️",
    sizes: [{ label: "One Price", price: 6500 }],
  },
  {
    id: "hair",
    name: "Hair Accessories",
    category: "Fashion",
    tag: null,
    desc: "Clips, bands and scarves to finish every hairstyle with flair.",
    icon: "🎀",
    sizes: [{ label: "One Price", price: 2500 }],
  },
  {
    id: "giftset",
    name: "Fashion Gift Set",
    category: "Fashion",
    tag: "Gift Set",
    desc: "A curated accessory bundle, boxed and ribboned — ready to gift.",
    icon: "🎁",
    sizes: [{ label: "One Price", price: 14000 }],
  },
];

const CATEGORIES = ["All", "Drinks", "Snacks", "Fashion"];

// Discount coupons — client-side for now. Note: since checkout currently
// trusts whatever the browser sends, a determined customer could tamper
// with this in devtools. Fine for a soft launch; if that risk matters once
// you're live, move this list (and the discount calculation) into the
// backend's POST /api/orders instead.
const COUPONS = {
  WELCOME10: { type: "percent", value: 10, label: "10% off" },
  HELENK500: { type: "flat", value: 500, label: "₦500 off" },
};

const TESTIMONIALS = [
  { name: "Ngozi A.", text: "The zobo tastes homemade — not too sweet, just right. My office now orders every Friday.", rating: 5 },
  { name: "Chiamaka O.", text: "Ordered a gift set for my sister's birthday. Beautifully packaged and delivered on time.", rating: 5 },
  { name: "Ifeoma U.", text: "Tigernut drink is so creamy and the buns are always fresh. Helen K is now my go-to.", rating: 5 },
];

const naira = (n) => `₦${n.toLocaleString("en-NG")}`;

// ---------------------------------------------------------------------------
// Small components
// ---------------------------------------------------------------------------
function Ribbon({ children }) {
  return (
    <span
      style={{
        position: "absolute",
        top: 12,
        left: -6,
        background: COLOR.gold,
        color: COLOR.ink,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.04em",
        padding: "4px 10px 4px 14px",
        borderRadius: "0 3px 3px 0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: -6,
          borderTop: "6px solid #8a7218",
          borderLeft: "6px solid transparent",
        }}
      />
    </span>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
        marginBottom: 10,
      }}
    >
      <span style={{ width: 28, height: 1, background: COLOR.gold }} />
      <span
        style={{
          fontSize: 12,
          letterSpacing: "0.18em",
          fontWeight: 700,
          color: COLOR.red,
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
      <span style={{ width: 28, height: 1, background: COLOR.gold }} />
    </div>
  );
}

function ProductRow({ title, items, onAdd, whatsappLink, wishlist, onToggleWishlist }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, margin: "0 0 14px" }}>{title}</h3>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
        {items.map((product) => (
          <div key={product.id} style={{ minWidth: 220, maxWidth: 220, flexShrink: 0 }}>
            <ProductCard
              product={product}
              onAdd={onAdd}
              whatsappLink={whatsappLink}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------
export default function HelenKStore() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(!!API_BASE_URL);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]); // array of product ids
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState("delivery");
  const [payment, setPayment] = useState("transfer");
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "", address: "" });
  const [orderNumber, setOrderNumber] = useState("");
  const [paystackReady, setPaystackReady] = useState(false);
  const [paying, setPaying] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, type, value }
  const [couponError, setCouponError] = useState("");

  // Load products from the backend if API_BASE_URL is set; otherwise the
  // hardcoded FALLBACK_PRODUCTS above are used as-is.
  useEffect(() => {
    if (!API_BASE_URL) return;
    setProductsLoading(true);
    fetch(`${API_BASE_URL}/api/products`)
      .then((r) => {
        if (!r.ok) throw new Error("Bad response");
        return r.json();
      })
      .then((data) => {
        const mapped = data.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          tag: p.tag,
          featured: !!p.featured,
          desc: p.description,
          icon: p.icon,
          sizes: p.sizes.map((s) => ({ label: s.label, price: s.price })),
        }));
        setProducts(mapped);
      })
      .catch((err) => {
        console.warn("Falling back to local product list — could not reach backend:", err);
        setProducts(FALLBACK_PRODUCTS);
      })
      .finally(() => setProductsLoading(false));
  }, []);

  // Load the Paystack Inline JS SDK once. Note: this script is fetched from
  // js.paystack.co, which may be blocked by this preview sandbox's network
  // rules — it will load normally once this file is hosted on your own site.
  useEffect(() => {
    if (window.PaystackPop) {
      setPaystackReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackReady(true);
    script.onerror = () => setPaystackReady(false);
    document.body.appendChild(script);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, products]);

  const featuredProducts = useMemo(() => products.filter((p) => p.featured), [products]);
  const bestSellers = useMemo(() => products.filter((p) => p.tag === "Best Seller"), [products]);
  const newArrivals = useMemo(() => products.filter((p) => p.tag === "New" || p.tag === "New Arrival"), [products]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const addToCart = (product, size) => {
    setCart((prev) => {
      const key = `${product.id}-${size.label}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          size: size.label,
          price: size.price,
          icon: product.icon,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const updateQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (key) => setCart((prev) => prev.filter((i) => i.key !== key));

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const coupon = COUPONS[code];
    if (!coupon) {
      setCouponError("That code isn't valid.");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon({ code, ...coupon });
    setCouponError("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = fulfillment === "delivery" && subtotal > 0 ? 1500 : 0;
  const discount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round((subtotal * appliedCoupon.value) / 100)
      : Math.min(appliedCoupon.value, subtotal)
    : 0;
  const total = subtotal + deliveryFee - discount;
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const whatsappOrderLink = (product, size) => {
    const msg = `Hello Helen K, I'd like to order: ${product.name} (${size.label}) — ${naira(size.price)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const whatsappCartLink = () => {
    const lines = cart.map((i) => `${i.qty} x ${i.name} (${i.size}) — ${naira(i.price * i.qty)}`);
    const msg = `Hello Helen K, I'd like to order:\n${lines.join("\n")}\n\nTotal: ${naira(total)}\nFulfillment: ${fulfillment}\nName: ${customer.name}\nPhone: ${customer.phone}${fulfillment === "delivery" ? `\nAddress: ${customer.address}` : ""}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const confirmOrder = (id) => {
    setOrderNumber(id);
    setOrderPlaced(true);
  };

  // Creates the order — via the backend if API_BASE_URL is set (which also
  // re-checks prices server-side), or locally otherwise. Returns
  // { order_id, total } either way, so the rest of the flow doesn't care
  // which path was taken.
  const createOrder = async () => {
    if (!API_BASE_URL) {
      return { order_id: "HK" + Math.floor(100000 + Math.random() * 900000), total };
    }
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer,
        fulfillment,
        payment_method: payment,
        items: cart.map((i) => ({
          product_id: i.id,
          product_name: i.name,
          size_label: i.size,
          qty: i.qty,
        })),
        coupon_code: appliedCoupon ? appliedCoupon.code : null,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Could not save the order");
    }
    return res.json(); // { order_id, subtotal, delivery_fee, total }
  };

  const placeOrder = async () => {
    setPaying(true);
    let order;
    try {
      order = await createOrder();
    } catch (err) {
      setPaying(false);
      alert(err.message || "Something went wrong creating the order. Please try again.");
      return;
    }

    // Bank transfer and pay-on-delivery don't need a card charge — confirm right away.
    if (payment !== "card") {
      setPaying(false);
      confirmOrder(order.order_id);
      return;
    }

    // Card payment: open the Paystack popup. Paystack handles the card entry
    // itself (Helen K's site never touches raw card numbers). On success, if
    // a backend is configured, we ask IT to confirm with Paystack directly
    // (using the secret key) before treating the order as paid — this is what
    // stops a modified browser from being able to fake a successful payment.
    if (!paystackReady || !window.PaystackPop) {
      setPaying(false);
      alert(
        "The card payment SDK didn't load in this preview (likely blocked by the sandbox network). This will work once the file is hosted on your own website with a real Paystack public key."
      );
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: customer.email,
      amount: Math.round(order.total * 100), // Paystack expects kobo — uses the server-confirmed total
      currency: "NGN",
      ref: "HK" + Date.now(),
      metadata: {
        order_id: order.order_id,
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: customer.name },
          { display_name: "Phone", variable_name: "phone", value: customer.phone },
        ],
      },
      callback: async function (response) {
        if (!API_BASE_URL) {
          setPaying(false);
          confirmOrder(order.order_id);
          return;
        }
        try {
          const verifyRes = await fetch(`${API_BASE_URL}/api/payments/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: order.order_id, reference: response.reference }),
          });
          const verifyData = await verifyRes.json();
          setPaying(false);
          if (verifyRes.ok && verifyData.verified) {
            confirmOrder(order.order_id);
          } else {
            alert("We couldn't confirm this payment. Please contact us on WhatsApp with your order number: " + order.order_id);
          }
        } catch (err) {
          setPaying(false);
          alert("Payment went through but we couldn't reach our server to confirm it. Please contact us on WhatsApp with your order number: " + order.order_id);
        }
      },
      onClose: function () {
        setPaying(false);
      },
    });
    handler.openIframe();
  };

  const resetOrder = () => {
    setCart([]);
    setOrderPlaced(false);
    setCheckoutOpen(false);
    setCustomer({ name: "", phone: "", address: "" });
    setPayment("transfer");
    setFulfillment("delivery");
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: COLOR.ink, background: "#fff" }}>
      {/* ---------------- NAV ---------------- */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "#fff",
          borderBottom: `1px solid ${COLOR.line}`,
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}
              className="hk-menu-btn"
              aria-label="Toggle menu"
            >
              <Menu size={22} color={COLOR.ink} />
            </button>
            <div
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                fontSize: 26,
                color: COLOR.red,
                letterSpacing: "0.01em",
              }}
            >
              Helen K
            </div>
          </div>

          <nav className="hk-nav" style={{ display: "flex", gap: 26 }}>
            {["Home", "Shop", "About", "Reviews", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: COLOR.ink,
                  textDecoration: "none",
                  fontSize: 14.5,
                  fontWeight: 500,
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="hk-search" style={{ position: "relative" }}>
              <Search size={16} color={COLOR.inkSoft} style={{ position: "absolute", left: 10, top: 9 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                style={{
                  padding: "7px 12px 7px 32px",
                  borderRadius: 20,
                  border: `1px solid ${COLOR.line}`,
                  fontSize: 13.5,
                  width: 170,
                  outline: "none",
                }}
              />
            </div>
            <button
              onClick={() => setWishlistOpen(true)}
              style={{
                position: "relative",
                background: "#fff",
                border: `1.5px solid ${COLOR.line}`,
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              aria-label="Open wishlist"
            >
              <Heart size={17} color={COLOR.red} fill={wishlist.length > 0 ? COLOR.red : "none"} />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    background: COLOR.gold,
                    color: COLOR.ink,
                    fontSize: 10.5,
                    fontWeight: 800,
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              style={{
                position: "relative",
                background: COLOR.green,
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              aria-label="Open cart"
            >
              <ShoppingBag size={18} color="#fff" />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    background: COLOR.gold,
                    color: COLOR.ink,
                    fontSize: 10.5,
                    fontWeight: 800,
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

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
              <a
                href="#shop"
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
              </a>
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

          {/* Scrapbook-style image collage using icon placeholders */}
          <div style={{ position: "relative", height: 340 }} className="hk-hero-collage">
            {[
              { icon: "🌺", label: "Zobo Drink", top: "0%", left: "8%", w: 150, rotate: -6 },
              { icon: "🥐", label: "Special Buns", top: "6%", left: "56%", w: 140, rotate: 5 },
              { icon: "👜", label: "Handbags", top: "48%", left: "0%", w: 150, rotate: 4 },
              { icon: "💍", label: "Jewelry", top: "52%", left: "54%", w: 150, rotate: -4 },
            ].map((c, idx) => (
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
                }}
              >
                <div
                  style={{
                    height: 120,
                    background:
                      idx % 2 === 0
                        ? `linear-gradient(135deg, ${COLOR.green}, ${COLOR.greenDark})`
                        : `linear-gradient(135deg, ${COLOR.red}, ${COLOR.redDark})`,
                    borderRadius: "2px 2px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 44,
                  }}
                >
                  {c.icon}
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
              value: "Facebook & Instagram: @HelenK",
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

      {/* ---------------- FOOTER ---------------- */}
      <footer style={{ background: COLOR.ink, color: "#fff", padding: "40px 20px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 22, marginBottom: 6, color: COLOR.goldLight }}>
            Helen K
          </div>
          <div style={{ fontSize: 13, color: "#d8cfc6", marginBottom: 14 }}>
            Refreshing Drinks • Delicious Treats • Stylish Fashion Accessories
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 18 }}>
            <Facebook size={18} color="#d8cfc6" />
            <Instagram size={18} color="#d8cfc6" />
            <MessageCircle size={18} color="#d8cfc6" />
          </div>
          <div style={{ fontSize: 12, color: "#a89b8f" }}>© 2026 Helen K. All Rights Reserved.</div>
        </div>
      </footer>

      {/* ---------------- CART DRAWER ---------------- */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 50 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "min(400px, 100%)",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: 20, borderBottom: `1px solid ${COLOR.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 20 }}>Your Cart</h3>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
              {cart.length === 0 ? (
                <p style={{ color: COLOR.inkSoft, textAlign: "center", marginTop: 40 }}>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.key} style={{ display: "flex", gap: 12, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${COLOR.line}` }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 8,
                        background: COLOR.ivory,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: COLOR.inkSoft, marginBottom: 6 }}>{item.size}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button onClick={() => updateQty(item.key, -1)} style={qtyBtnStyle}>
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: 13, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.key, 1)} style={qtyBtnStyle}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{naira(item.price * item.qty)}</div>
                      <button
                        onClick={() => removeItem(item.key)}
                        style={{ background: "none", border: "none", color: COLOR.red, fontSize: 11.5, cursor: "pointer", marginTop: 6 }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: 20, borderTop: `1px solid ${COLOR.line}` }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {appliedCoupon ? (
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "rgba(11,110,79,0.08)",
                        borderRadius: 8,
                        padding: "9px 12px",
                        fontSize: 13,
                      }}
                    >
                      <span>
                        <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.label})
                      </span>
                      <button onClick={removeCoupon} style={{ background: "none", border: "none", color: COLOR.red, fontSize: 12, cursor: "pointer" }}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon code"
                        style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLOR.line}`, fontSize: 13 }}
                      />
                      <button
                        onClick={applyCoupon}
                        style={{ padding: "9px 16px", borderRadius: 8, border: `1.5px solid ${COLOR.green}`, background: "#fff", color: COLOR.green, fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}
                      >
                        Apply
                      </button>
                    </>
                  )}
                </div>
                {couponError && <div style={{ color: COLOR.red, fontSize: 12, marginBottom: 10, marginTop: -8 }}>{couponError}</div>}

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 14 }}>
                  <span>Subtotal</span>
                  <span>{naira(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 14, color: COLOR.green }}>
                    <span>Discount</span>
                    <span>-{naira(discount)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 15, fontWeight: 700, marginTop: 6 }}>
                  <span>Total</span>
                  <span>{naira(subtotal - discount)}</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                  style={{ width: "100%", background: COLOR.red, color: "#fff", border: "none", borderRadius: 8, padding: "13px 0", fontWeight: 700, fontSize: 14.5, cursor: "pointer" }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- WISHLIST DRAWER ---------------- */}
      {wishlistOpen && (
        <div
          onClick={() => setWishlistOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 50 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "min(400px, 100%)",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: 20, borderBottom: `1px solid ${COLOR.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 20 }}>Your Wishlist</h3>
              <button onClick={() => setWishlistOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
              {wishlist.length === 0 ? (
                <p style={{ color: COLOR.inkSoft, textAlign: "center", marginTop: 40 }}>Nothing saved yet — tap the heart on any product.</p>
              ) : (
                wishlist.map((productId) => {
                  const product = products.find((p) => p.id === productId);
                  if (!product) return null;
                  return (
                    <div key={productId} style={{ display: "flex", gap: 12, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${COLOR.line}` }}>
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 8,
                          background: COLOR.ivory,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                          flexShrink: 0,
                        }}
                      >
                        {product.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{product.name}</div>
                        <div style={{ fontSize: 12.5, color: COLOR.inkSoft, marginBottom: 8 }}>{naira(product.sizes[0].price)}</div>
                        <button
                          onClick={() => {
                            addToCart(product, product.sizes[0]);
                            setWishlistOpen(false);
                          }}
                          style={{ background: COLOR.red, color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <button onClick={() => toggleWishlist(productId)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                        <Heart size={16} color={COLOR.red} fill={COLOR.red} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- CHECKOUT MODAL ---------------- */}
      {checkoutOpen && (
        <div
          onClick={() => !orderPlaced && setCheckoutOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 14, maxWidth: 480, width: "100%", maxHeight: "88vh", overflowY: "auto" }}
          >
            {!orderPlaced ? (
              <div style={{ padding: 26 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 21 }}>Checkout</h3>
                  <button onClick={() => setCheckoutOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <X size={20} />
                  </button>
                </div>

                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="e.g. Ada Eze" />

                <label style={labelStyle}>Phone Number</label>
                <input style={inputStyle} value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="080X XXX XXXX" />

                <label style={labelStyle}>Email Address</label>
                <input style={inputStyle} type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" />

                <label style={labelStyle}>Delivery or Pickup</label>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  {["delivery", "pickup"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFulfillment(opt)}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        borderRadius: 8,
                        border: `1.5px solid ${fulfillment === opt ? COLOR.green : COLOR.line}`,
                        background: fulfillment === opt ? "rgba(11,110,79,0.08)" : "#fff",
                        fontWeight: 600,
                        fontSize: 13.5,
                        cursor: "pointer",
                        textTransform: "capitalize",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {fulfillment === "delivery" && (
                  <>
                    <label style={labelStyle}>Delivery Address</label>
                    <input style={inputStyle} value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="Street, area, city" />
                  </>
                )}

                <label style={labelStyle}>Payment Method</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                  {[
                    { id: "transfer", label: "Bank Transfer" },
                    { id: "card", label: "Debit / Credit Card" },
                    { id: "pod", label: "Pay on Delivery" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPayment(opt.id)}
                      style={{
                        textAlign: "left",
                        padding: "11px 14px",
                        borderRadius: 8,
                        border: `1.5px solid ${payment === opt.id ? COLOR.red : COLOR.line}`,
                        background: payment === opt.id ? "rgba(166,30,34,0.06)" : "#fff",
                        fontWeight: 600,
                        fontSize: 13.5,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {opt.label}
                      {payment === opt.id && <Check size={16} color={COLOR.red} />}
                    </button>
                  ))}
                </div>

                {payment === "transfer" && (
                  <div style={{ background: COLOR.ivory, borderRadius: 8, padding: 14, marginBottom: 18, fontSize: 13.5, lineHeight: 1.7 }}>
                    <strong>Transfer to:</strong>
                    <br />
                    Bank Name: [Add Bank Name]
                    <br />
                    Account Name: Helen K
                    <br />
                    Account Number: [Add Account Number]
                    <br />
                    <span style={{ color: COLOR.inkSoft }}>
                      Please send your payment receipt via WhatsApp after placing the order.
                    </span>
                  </div>
                )}

                {payment === "card" && (
                  <div style={{ background: COLOR.ivory, borderRadius: 8, padding: 14, marginBottom: 18, fontSize: 13, color: COLOR.inkSoft, lineHeight: 1.6 }}>
                    Card details are entered on Paystack's own secure popup — Helen K's site never
                    sees or stores your card number. Click <strong>Place Order</strong> below to open it.
                    {!paystackReady && (
                      <div style={{ marginTop: 8, color: COLOR.red, fontSize: 12 }}>
                        Payment SDK not loaded yet — this is expected in this preview sandbox and will
                        work once hosted on your own site.
                      </div>
                    )}
                  </div>
                )}

                {payment === "pod" && (
                  <div style={{ background: COLOR.ivory, borderRadius: 8, padding: 14, marginBottom: 18, fontSize: 13.5, color: COLOR.inkSoft }}>
                    Pay in cash or by card when your order arrives. Available in select delivery areas only.
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4 }}>
                  <span>Subtotal</span>
                  <span>{naira(subtotal)}</span>
                </div>
                {fulfillment === "delivery" && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4, color: COLOR.inkSoft }}>
                    <span>Delivery Fee</span>
                    <span>{naira(deliveryFee)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4, color: COLOR.green }}>
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{naira(discount)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 700, marginTop: 8, marginBottom: 20 }}>
                  <span>Total</span>
                  <span>{naira(total)}</span>
                </div>

                {(() => {
                  const missing =
                    !customer.name ||
                    !customer.phone ||
                    (fulfillment === "delivery" && !customer.address) ||
                    (payment === "card" && !customer.email);
                  return (
                    <button
                      onClick={placeOrder}
                      disabled={missing || paying}
                      style={{
                        width: "100%",
                        background: missing || paying ? "#c9b8b8" : COLOR.red,
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "14px 0",
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: missing || paying ? "not-allowed" : "pointer",
                      }}
                    >
                      {paying ? "Opening secure payment…" : payment === "card" ? "Pay Now" : "Place Order"}
                    </button>
                  );
                })()}
              </div>
            ) : (
              <div style={{ padding: 36, textAlign: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: COLOR.green,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 18px",
                  }}
                >
                  <Check size={30} color="#fff" />
                </div>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 21, margin: "0 0 8px" }}>Order Received!</h3>
                <p style={{ color: COLOR.inkSoft, fontSize: 14, marginBottom: 4 }}>
                  Order Number: <strong style={{ color: COLOR.ink }}>{orderNumber}</strong>
                </p>
                <p style={{ color: COLOR.inkSoft, fontSize: 13.5, marginBottom: 22 }}>
                  {payment === "transfer"
                    ? "Please send your payment receipt via WhatsApp to confirm."
                    : payment === "pod"
                    ? "Have your payment ready for delivery."
                    : "Your card payment will be confirmed shortly."}
                </p>
                <a
                  href={whatsappCartLink()}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: COLOR.green,
                    color: "#fff",
                    textDecoration: "none",
                    padding: "12px 22px",
                    borderRadius: 30,
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 14,
                  }}
                >
                  <MessageCircle size={16} /> Confirm Order on WhatsApp
                </a>
                <div>
                  <button onClick={resetOrder} style={{ background: "none", border: "none", color: COLOR.inkSoft, fontSize: 13, textDecoration: "underline", cursor: "pointer" }}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- FLOATING WHATSAPP LIVE CHAT ---------------- */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Helen K, I have a question about your products.")}`}
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed",
          bottom: 22,
          right: 22,
          zIndex: 45,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: COLOR.green,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          textDecoration: "none",
        }}
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={26} color="#fff" />
      </a>

      <style>{`
        @media (max-width: 860px) {
          .hk-nav { display: none !important; }
          .hk-menu-btn { display: block !important; }
          .hk-search { display: none !important; }
          .hk-hero-grid { grid-template-columns: 1fr !important; }
          .hk-hero-collage { height: 280px !important; margin-top: 20px; }
        }
      `}</style>
    </div>
  );
}

function ProductCard({ product, onAdd, whatsappLink, isWishlisted, onToggleWishlist }) {
  const [sizeIdx, setSizeIdx] = useState(0);
  const size = product.sizes[sizeIdx];
  const COLORS_ALT = product.category === "Fashion" ? COLOR.gold : product.category === "Snacks" ? COLOR.green : COLOR.red;

  return (
    <div
      style={{
        border: `1px solid ${COLOR.line}`,
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {product.tag && <Ribbon>{product.tag}</Ribbon>}
      <button
        onClick={() => onToggleWishlist(product.id)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          background: "rgba(255,255,255,0.9)",
          border: "none",
          borderRadius: "50%",
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        }}
      >
        <Heart size={15} color={COLOR.red} fill={isWishlisted ? COLOR.red : "none"} />
      </button>
      <div
        style={{
          height: 140,
          background: `linear-gradient(135deg, ${COLORS_ALT}, ${COLOR.ink}22)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
        }}
      >
        {product.icon}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 4 }}>{product.name}</div>
        <div style={{ fontSize: 12.5, color: COLOR.inkSoft, lineHeight: 1.5, marginBottom: 12, flex: 1 }}>{product.desc}</div>

        {product.sizes.length > 1 && (
          <select
            value={sizeIdx}
            onChange={(e) => setSizeIdx(Number(e.target.value))}
            style={{ marginBottom: 10, padding: "7px 8px", borderRadius: 6, border: `1px solid ${COLOR.line}`, fontSize: 12.5 }}
          >
            {product.sizes.map((s, i) => (
              <option key={s.label} value={i}>
                {s.label} — {naira(s.price)}
              </option>
            ))}
          </select>
        )}

        <div style={{ fontWeight: 800, fontSize: 16, color: COLOR.red, marginBottom: 12 }}>{naira(size.price)}</div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onAdd(product, size)}
            style={{
              flex: 1,
              background: COLOR.red,
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "9px 0",
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
          <a
            href={whatsappLink(product, size)}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              background: "#fff",
              border: `1.5px solid ${COLOR.green}`,
              color: COLOR.green,
              borderRadius: 7,
              padding: "9px 0",
              fontSize: 12,
              fontWeight: 700,
              textAlign: "center",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12.5, fontWeight: 600, color: COLOR.inkSoft, marginBottom: 6 };
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: `1px solid ${COLOR.line}`,
  fontSize: 13.5,
  marginBottom: 14,
  outline: "none",
  boxSizing: "border-box",
};
const qtyBtnStyle = {
  width: 22,
  height: 22,
  borderRadius: "50%",
  border: `1px solid ${COLOR.line}`,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};
