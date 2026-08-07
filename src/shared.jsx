import React, { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import zoboImg from "./assets/zobo.jpg";
import tigernutImg from "./assets/tigernut.jpg";
import kunuImg from "./assets/kunu.jpg";
import bonsImg from "./assets/bons.jpg";
import peanutSachetImg from "./assets/peanut-sachet.jpg";
import cashewImg from "./assets/cashew.jpg";
import goldSetHeartImg from "./assets/gold-set-heart.jpg";
import goldSetOvalImg from "./assets/gold-set-oval.jpg";
import zirLeafWrapImg from "./assets/zir-leaf-wrap.jpg";
import zirMarquiseFringeImg from "./assets/zir-marquise-fringe.jpg";
import zirHeartVineImg from "./assets/zir-heart-vine.jpg";
import zirTeardropClusterImg from "./assets/zir-teardrop-cluster.jpg";
import zirGoldFloralImg from "./assets/zir-gold-floral.jpg";
import zirRainbowLeafImg from "./assets/zir-rainbow-leaf.jpg";
import zirWheatFlowerImg from "./assets/zir-wheat-flower.jpg";
import zirBarrelLinkImg from "./assets/zir-barrel-link.jpg";
import zirTwistedBaguetteImg from "./assets/zir-twisted-baguette.jpg";
import zirLeafSprayImg from "./assets/zir-leaf-spray.jpg";
import zirRainbowFringeImg from "./assets/zir-rainbow-fringe.jpg";
import comboGoldInitialImg from "./assets/combo-gold-initial.jpg";
import comboGoldHeartLoveImg from "./assets/combo-gold-heart-love.jpg";
import comboRedPearlImg from "./assets/combo-red-pearl.jpg";
import comboIcedGoldImg from "./assets/combo-iced-gold.jpg";
import comboSilverLogoImg from "./assets/combo-silver-logo.jpg";
import earringsTritoneFanImg from "./assets/earrings-tritone-fan.jpg";
import earringsTritoneBowImg from "./assets/earrings-tritone-bow.jpg";
import hairStraightenerImg from "./assets/hair-straightener.jpg";
import earrStrawHatImg from "./assets/earr-straw-hat.jpg";
import currenWhiteDialImg from "./assets/curren-white-dial.jpg";
import earrTritoneDiamondImg from "./assets/earr-tritone-diamond.jpg";
import currenBlueDialImg from "./assets/curren-blue-dial.jpg";
import earrPearlTeardropImg from "./assets/earr-pearl-teardrop.jpg";
import earrPearlHeartImg from "./assets/earr-pearl-heart.jpg";
import earrPearlOvalImg from "./assets/earr-pearl-oval.jpg";
import earrTritoneHeartWaveImg from "./assets/earr-tritone-heart-wave.jpg";
import currenGoldBlackDialImg from "./assets/curren-gold-black-dial.jpg";
import earrTritoneBowDangleImg from "./assets/earr-tritone-bow-dangle.jpg";
import earrTritoneOvalDomeImg from "./assets/earr-tritone-oval-dome.jpg";
import earrTritoneHeartShellImg from "./assets/earr-tritone-heart-shell.jpg";
import wrapperGreenFloralImg from "./assets/wrapper-green-floral.jpg";
import wrapperPurplePatternImg from "./assets/wrapper-purple-pattern.jpg";
import wrapperBrownFloralImg from "./assets/wrapper-brown-floral.jpg";
import wrapperNavyPatternImg from "./assets/wrapper-navy-pattern.jpg";
import wrapperGreenPatternImg from "./assets/wrapper-green-pattern.jpg";

// ---------------------------------------------------------------------------
// Brand tokens
// ---------------------------------------------------------------------------
export const COLOR = {
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

export const WHATSAPP_NUMBER = "2348083270113"; // from product photos: 07083270113
export const PHONE = "0708 327 0113"; // same as WhatsApp — send a separate line number if you have one
export const EMAIL = "udehelen024@gmail.com";
export const ADDRESS = "Upper North 5th, by Shekinah Junction, New GRA, Enugu, Enugu State, Nigeria";
export const FACEBOOK_URL = "https://www.facebook.com/nky1990";
export const INSTAGRAM_HANDLE = "@helenk1990";

// Replace with your own Paystack PUBLIC key (starts with pk_test_ or pk_live_).
// Get one free at https://dashboard.paystack.com after creating an account.
// NEVER put a secret key (sk_...) in front-end code — only the public key belongs here.
export const PAYSTACK_PUBLIC_KEY = "pk_test_replace_with_your_public_key";

// Set this to your deployed backend's URL (see helen-k-backend/README.md).
// Left blank, the storefront falls back to the hardcoded product list below
// and skips server-side order saving / payment verification.
export const API_BASE_URL = ""; // e.g. "https://helenk-api.up.railway.app"

// ---------------------------------------------------------------------------
// Product data — used as a fallback if API_BASE_URL isn't set or the backend can't be reached.
// ---------------------------------------------------------------------------
export const FALLBACK_PRODUCTS = [
  {
    id: "zobo",
    name: "Zobo Drink",
    category: "Drinks",
    tag: "Best Seller",
    featured: true,
    desc: "Chilled hibiscus zobo, naturally spiced with ginger, pineapple and cloves. No preservatives.",
    icon: "🌺",
    photo: zoboImg,
    sizes: [{ label: "Bottle", price: 1500 }],
  },
  {
    id: "tigernut",
    name: "Tigernut Drink",
    category: "Drinks",
    tag: "Best Seller",
    desc: "Creamy tigernut milk (kunun aya), blended fresh with dates and coconut. A natural energy boost.",
    icon: "🥥",
    photo: tigernutImg,
    sizes: [{ label: "Bottle", price: 2000 }],
  },
  {
    id: "kunu",
    name: "Kunu Drink",
    category: "Drinks",
    tag: "New",
    desc: "Traditional millet & ginger kunu — smooth, lightly spiced, and refreshingly wholesome.",
    icon: "🌾",
    photo: kunuImg,
    sizes: [{ label: "Bottle", price: 2000 }],
  },
  {
    id: "bons",
    name: "Bons",
    category: "Snacks",
    tag: "Best Seller",
    desc: "Soft, lightly sweet, bite-sized bons — perfect with a cold zobo or on their own.",
    icon: "🥐",
    photo: bonsImg,
    sizes: [{ label: "Pack", price: 1500 }],
  },
  {
    id: "peanut",
    name: "Peanut",
    category: "Snacks",
    tag: null,
    desc: "Roasted peanuts, available in a resealable sachet or a jarred bottle — same great crunch.",
    icon: "🥜",
    photo: peanutSachetImg,
    sizes: [
      { label: "Sachet", price: 2000 },
      { label: "Bottle", price: 2000 },
    ],
  },
  {
    id: "cashew",
    name: "Cashew Nut",
    category: "Snacks",
    tag: "New",
    desc: "Whole roasted cashew nuts — a rich, satisfying snack for any time of day.",
    icon: "🌰",
    photo: cashewImg,
    sizes: [{ label: "Pack", price: 2500 }],
  },
  {
    id: "shoes",
    name: "Ladies' Shoes",
    category: "Fashion",
    tag: "New Arrival",
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
    id: "zirconia-tassel",
    name: "Zirconia Set — Tassel Design",
    category: "Fashion",
    tag: "Gift Set",
    featured: true,
    desc: "Necklace, bracelet and earring set with flowing tassel detail — a statement piece for special occasions.",
    icon: "💍",
    photo: goldSetHeartImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-beaded",
    name: "Zirconia Set — Beaded Design",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a bold beaded texture — elegant and eye-catching.",
    icon: "💍",
    photo: goldSetOvalImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-leaf-wrap",
    name: "Zirconia Set — Leaf Wrap",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a sculpted leaf-wrap pendant.",
    icon: "💍",
    photo: zirLeafWrapImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-marquise-fringe",
    name: "Zirconia Set — Marquise Fringe",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a sparkling marquise fringe drop.",
    icon: "💍",
    photo: zirMarquiseFringeImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-heart-vine",
    name: "Zirconia Set — Heart Vine",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a delicate heart-vine motif.",
    icon: "💍",
    photo: zirHeartVineImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-teardrop-cluster",
    name: "Zirconia Set — Teardrop Cluster",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with clustered teardrop detailing.",
    icon: "💍",
    photo: zirTeardropClusterImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-gold-floral",
    name: "Zirconia Set — Gold Floral",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a gold-tone floral design.",
    icon: "💍",
    photo: zirGoldFloralImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-rainbow-leaf",
    name: "Zirconia Set — Rainbow Leaf",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a multicolour leaf design.",
    icon: "💍",
    photo: zirRainbowLeafImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-wheat-flower",
    name: "Zirconia Set — Wheat Flower",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a wheat-leaf chain and floral drop pendant.",
    icon: "💍",
    photo: zirWheatFlowerImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-barrel-link",
    name: "Zirconia Set — Barrel Link",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a bold barrel-link chain.",
    icon: "💍",
    photo: zirBarrelLinkImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-twisted-baguette",
    name: "Zirconia Set — Twisted Baguette",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a twisted baguette-cut design.",
    icon: "💍",
    photo: zirTwistedBaguetteImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-leaf-spray",
    name: "Zirconia Set — Leaf Spray",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a spray-of-leaves design.",
    icon: "💍",
    photo: zirLeafSprayImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "zirconia-rainbow-fringe",
    name: "Zirconia Set — Rainbow Fringe",
    category: "Fashion",
    tag: "Gift Set",
    desc: "Necklace, bracelet and earring set with a multicolour baguette fringe.",
    icon: "💍",
    photo: zirRainbowFringeImg,
    sizes: [{ label: "One Price", price: 22000 }],
  },
  {
    id: "combo-gold-initial",
    name: "Complete Set Combo — Gold Initial",
    category: "Fashion",
    tag: "New Arrival",
    desc: "Super high quality complete set combo — watch, bangles, necklace and earrings with an initial pendant. Stainless steel, non-tarnish.",
    icon: "⌚",
    photo: comboGoldInitialImg,
    sizes: [{ label: "One Price", price: 21500 }],
  },
  {
    id: "combo-gold-heart-love",
    name: "Complete Set Combo — Gold Heart",
    category: "Fashion",
    tag: null,
    desc: "Super high quality complete set combo — watch, bangle and heart pendant necklace/earrings. Stainless steel, non-tarnish.",
    icon: "⌚",
    photo: comboGoldHeartLoveImg,
    sizes: [{ label: "One Price", price: 21500 }],
  },
  {
    id: "combo-red-pearl",
    name: "Complete Set Combo — Red Pearl",
    category: "Fashion",
    tag: null,
    desc: "Super high quality complete set combo — rhinestone watch, bangle and pearl pendant necklace/earrings. Stainless steel, non-tarnish.",
    icon: "⌚",
    photo: comboRedPearlImg,
    sizes: [{ label: "One Price", price: 21500 }],
  },
  {
    id: "combo-iced-gold",
    name: "Complete Set Combo — Iced Gold",
    category: "Fashion",
    tag: "Best Seller",
    desc: "Super high quality complete set combo — fully iced-out watch, bracelet and pendant necklace/earrings. Stainless steel, non-tarnish.",
    icon: "⌚",
    photo: comboIcedGoldImg,
    sizes: [{ label: "One Price", price: 21500 }],
  },
  {
    id: "combo-silver-logo",
    name: "Complete Set Combo — Silver Logo",
    category: "Fashion",
    tag: null,
    desc: "Super high quality complete set combo — silver watch, bracelet and logo pendant necklace/earrings. Stainless steel, non-tarnish.",
    icon: "⌚",
    photo: comboSilverLogoImg,
    sizes: [{ label: "One Price", price: 21500 }],
  },
  {
    id: "earrings-tritone-fan",
    name: "Stainless Steel Earrings — Tri-Tone Fan",
    category: "Fashion",
    tag: "New",
    desc: "Fan-shaped stud earrings in gold, silver and rose-gold tones. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earringsTritoneFanImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earrings-tritone-bow",
    name: "Stainless Steel Earrings — Tri-Tone Bow",
    category: "Fashion",
    tag: null,
    desc: "Bow-shaped stud earrings in gold, silver and rose-gold tones. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earringsTritoneBowImg,
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
    id: "hair-straightener",
    name: "Hair Straightening Comb",
    category: "Fashion",
    tag: "New",
    desc: "Temperature-control straightening comb — smooths and styles in one pass. Doubles as a styling brush.",
    icon: "💇",
    photo: hairStraightenerImg,
    sizes: [{ label: "One Price", price: 10000 }],
  },
  {
    id: "earr-straw-hat",
    name: "Stainless Steel Earrings — Straw Hat",
    category: "Fashion",
    tag: null,
    desc: "Sun-hat shaped stud earrings with a tri-tone bow detail. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrStrawHatImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earr-tritone-diamond",
    name: "Stainless Steel Earrings — Tri-Tone Diamond",
    category: "Fashion",
    tag: null,
    desc: "Diamond-shaped ridged stud earrings in gold, silver and rose-gold tones. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrTritoneDiamondImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earr-pearl-teardrop",
    name: "Stainless Steel Earrings — Pearl Teardrop",
    category: "Fashion",
    tag: null,
    desc: "Gold teardrop stud earrings with a pearl centre. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrPearlTeardropImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earr-pearl-heart",
    name: "Stainless Steel Earrings — Pearl Heart",
    category: "Fashion",
    tag: null,
    desc: "Gold heart-shaped stud earrings with a pearl centre. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrPearlHeartImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earr-pearl-oval",
    name: "Stainless Steel Earrings — Pearl Oval",
    category: "Fashion",
    tag: null,
    desc: "Gold oval stud earrings with a pearl centre. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrPearlOvalImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earr-tritone-heart-wave",
    name: "Stainless Steel Earrings — Tri-Tone Heart Wave",
    category: "Fashion",
    tag: null,
    desc: "Heart-shaped wave stud earrings in gold, silver and rose-gold tones. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrTritoneHeartWaveImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earr-tritone-bow-dangle",
    name: "Stainless Steel Earrings — Tri-Tone Bow Dangle",
    category: "Fashion",
    tag: null,
    desc: "Bow-top dangle earrings in gold, silver and rose-gold tones. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrTritoneBowDangleImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earr-tritone-oval-dome",
    name: "Stainless Steel Earrings — Tri-Tone Oval Dome",
    category: "Fashion",
    tag: null,
    desc: "Domed oval stud earrings in gold, silver and rose-gold tones. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrTritoneOvalDomeImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "earr-tritone-heart-shell",
    name: "Stainless Steel Earrings — Tri-Tone Heart Shell",
    category: "Fashion",
    tag: null,
    desc: "Ribbed heart-shaped stud earrings in gold, silver and rose-gold tones. Stainless steel, non-tarnish.",
    icon: "✨",
    photo: earrTritoneHeartShellImg,
    sizes: [{ label: "One Price", price: 3500 }],
  },
  {
    id: "curren-white-dial",
    name: "CURREN Ladies Watch — Silver White Dial",
    category: "Fashion",
    tag: "New Arrival",
    desc: "CURREN ladies watch, silver strap with a white dial. Comes with box and bag.",
    icon: "⌚",
    photo: currenWhiteDialImg,
    sizes: [{ label: "One Price", price: 21000 }],
  },
  {
    id: "curren-blue-dial",
    name: "CURREN Ladies Watch — Silver Blue Dial",
    category: "Fashion",
    tag: null,
    desc: "CURREN ladies watch, silver strap with a blue dial. Comes with box and bag.",
    icon: "⌚",
    photo: currenBlueDialImg,
    sizes: [{ label: "One Price", price: 21000 }],
  },
  {
    id: "curren-gold-black-dial",
    name: "CURREN Ladies Watch — Gold Black Dial",
    category: "Fashion",
    tag: null,
    desc: "CURREN ladies watch, gold strap with a black dial. Comes with box and bag.",
    icon: "⌚",
    photo: currenGoldBlackDialImg,
    sizes: [{ label: "One Price", price: 21000 }],
  },
  {
    id: "wrapper-green-floral",
    name: "Amanda Wrapper — Green Floral",
    category: "Fashion",
    tag: "New Arrival",
    desc: "Classic and beautiful Amanda wrapper fabric, 100% cotton, green floral pattern.",
    icon: "🧵",
    photo: wrapperGreenFloralImg,
    sizes: [{ label: "6 Yards", price: 21500 }],
  },
  {
    id: "wrapper-purple-pattern",
    name: "Amanda Wrapper — Purple Pattern",
    category: "Fashion",
    tag: null,
    desc: "Classic and beautiful Amanda wrapper fabric, 100% cotton, purple pattern.",
    icon: "🧵",
    photo: wrapperPurplePatternImg,
    sizes: [{ label: "6 Yards", price: 21500 }],
  },
  {
    id: "wrapper-brown-floral",
    name: "Amanda Wrapper — Brown Floral",
    category: "Fashion",
    tag: null,
    desc: "Classic and beautiful Amanda wrapper fabric, 100% cotton, brown floral pattern.",
    icon: "🧵",
    photo: wrapperBrownFloralImg,
    sizes: [{ label: "6 Yards", price: 21500 }],
  },
  {
    id: "wrapper-navy-pattern",
    name: "Amanda Wrapper — Navy Pattern",
    category: "Fashion",
    tag: null,
    desc: "Classic and beautiful Amanda wrapper fabric, 100% cotton, navy pattern.",
    icon: "🧵",
    photo: wrapperNavyPatternImg,
    sizes: [{ label: "6 Yards", price: 21500 }],
  },
  {
    id: "wrapper-green-pattern",
    name: "Amanda Wrapper — Green Pattern",
    category: "Fashion",
    tag: null,
    desc: "Classic and beautiful Amanda wrapper fabric, 100% cotton, green pattern.",
    icon: "🧵",
    photo: wrapperGreenPatternImg,
    sizes: [{ label: "6 Yards", price: 21500 }],
  },
];

export const CATEGORIES = ["All", "Drinks", "Snacks", "Fashion"];

// Discount coupons — client-side for now. Note: since checkout currently
// trusts whatever the browser sends, a determined customer could tamper
// with this in devtools. Fine for a soft launch; if that risk matters once
// you're live, move this list (and the discount calculation) into the
// backend's POST /api/orders instead.
export const COUPONS = {
  WELCOME10: { type: "percent", value: 10, label: "10% off" },
  HELENK500: { type: "flat", value: 500, label: "₦500 off" },
};

export const TESTIMONIALS = [
  { name: "Ngozi A.", text: "The zobo tastes homemade — not too sweet, just right. My office now orders every Friday.", rating: 5 },
  { name: "Chiamaka O.", text: "Ordered a gift set for my sister's birthday. Beautifully packaged and delivered on time.", rating: 5 },
  { name: "Ifeoma U.", text: "Tigernut drink is so creamy and the buns are always fresh. Helen K is now my go-to.", rating: 5 },
];

export const naira = (n) => `₦${n.toLocaleString("en-NG")}`;

// ---------------------------------------------------------------------------
// Small components
// ---------------------------------------------------------------------------
export function Ribbon({ children }) {
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

export function SectionEyebrow({ children }) {
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

export function ProductRow({ title, items, onAdd, whatsappLink, wishlist, onToggleWishlist }) {
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

export function ProductCard({ product, onAdd, whatsappLink, isWishlisted, onToggleWishlist }) {
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
          height: 220,
          background: product.photo ? COLOR.ivory : `linear-gradient(135deg, ${COLORS_ALT}, ${COLOR.ink}22)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          overflow: "hidden",
        }}
      >
        {product.photo ? (
          <img src={product.photo} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          product.icon
        )}
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

export const labelStyle = { display: "block", fontSize: 12.5, fontWeight: 600, color: COLOR.inkSoft, marginBottom: 6 };
export const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: `1px solid ${COLOR.line}`,
  fontSize: 13.5,
  marginBottom: 14,
  outline: "none",
  boxSizing: "border-box",
};
export const qtyBtnStyle = {
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
