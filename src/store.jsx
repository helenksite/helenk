import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  COLOR,
  WHATSAPP_NUMBER,
  PHONE,
  EMAIL,
  ADDRESS,
  FACEBOOK_URL,
  INSTAGRAM_HANDLE,
  PAYSTACK_PUBLIC_KEY,
  API_BASE_URL,
  FALLBACK_PRODUCTS,
  CATEGORIES,
  COUPONS,
  TESTIMONIALS,
  naira,
} from "./shared";

const StoreContext = createContext(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}

export function StoreProvider({ children }) {
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
          photo: product.photo,
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


  const value = {
    // constants re-exported for convenience
    COLOR, WHATSAPP_NUMBER, PHONE, EMAIL, ADDRESS, FACEBOOK_URL, INSTAGRAM_HANDLE, TESTIMONIALS, naira,
    // state
    products, productsLoading, cart, cartOpen, setCartOpen, wishlist, wishlistOpen, setWishlistOpen,
    checkoutOpen, setCheckoutOpen, orderPlaced, activeCategory, setActiveCategory, search, setSearch,
    menuOpen, setMenuOpen, fulfillment, setFulfillment, payment, setPayment, customer, setCustomer,
    orderNumber, paystackReady, paying, couponInput, setCouponInput, appliedCoupon, couponError,
    // derived
    filteredProducts, featuredProducts, bestSellers, newArrivals, subtotal, deliveryFee, discount, total, cartCount,
    // functions
    toggleWishlist, addToCart, updateQty, removeItem, applyCoupon, removeCoupon,
    whatsappOrderLink, whatsappCartLink, placeOrder, resetOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
