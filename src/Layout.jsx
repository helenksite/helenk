import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  ShoppingBag, X, Plus, Minus, MessageCircle, Search, Menu, MapPin, Phone, Mail,
  Instagram, Facebook, Check, ChevronRight, Star, Heart,
} from "lucide-react";
import { COLOR, naira, labelStyle, inputStyle, qtyBtnStyle } from "./shared";
import { useStore } from "./store";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];

export default function Layout() {
  const s = useStore();
  const {
    WHATSAPP_NUMBER, PHONE, EMAIL, ADDRESS, FACEBOOK_URL, INSTAGRAM_HANDLE,
    cart, cartOpen, setCartOpen, wishlist, wishlistOpen, setWishlistOpen,
    checkoutOpen, setCheckoutOpen, orderPlaced, search, setSearch, menuOpen, setMenuOpen,
    fulfillment, setFulfillment, payment, setPayment, customer, setCustomer,
    orderNumber, paying, couponInput, setCouponInput, appliedCoupon, couponError,
    subtotal, deliveryFee, discount, total, cartCount,
    toggleWishlist, updateQty, removeItem, applyCoupon, removeCoupon,
    whatsappCartLink, placeOrder, resetOrder, products, addToCart,
  } = s;
  const location = useLocation();

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
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  color: location.pathname === item.to ? COLOR.red : COLOR.ink,
                  textDecoration: "none",
                  fontSize: 14.5,
                  fontWeight: location.pathname === item.to ? 700 : 500,
                }}
              >
                {item.label}
              </Link>
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

      {menuOpen && (
        <div
          className="hk-mobile-menu"
          style={{ borderBottom: `1px solid ${COLOR.line}`, background: "#fff", padding: "10px 20px" }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px 0",
                color: location.pathname === item.to ? COLOR.red : COLOR.ink,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: location.pathname === item.to ? 700 : 500,
                borderBottom: `1px solid ${COLOR.line}`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}


      <main>
        <Outlet />
      </main>

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
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={18} color="#d8cfc6" />
            </a>
            <a href={`https://instagram.com/${INSTAGRAM_HANDLE.replace("@", "")}`} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={18} color="#d8cfc6" />
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle size={18} color="#d8cfc6" />
            </a>
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
                        overflow: "hidden",
                      }}
                    >
                      {item.photo ? (
                        <img src={item.photo} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      ) : (
                        item.icon
                      )}
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
                          overflow: "hidden",
                        }}
                      >
                        {product.photo ? (
                          <img src={product.photo} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        ) : (
                          product.icon
                        )}
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
        }
      `}</style>
    </div>
  );
}
