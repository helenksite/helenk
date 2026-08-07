import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./store";
import Layout from "./Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";

// HashRouter (URLs like /#/shop) is used instead of BrowserRouter because
// GitHub Pages is a static host with no server-side rewrites — a direct
// visit or refresh on /shop would 404 with BrowserRouter. HashRouter avoids
// that entirely since the part after # is never sent to the server.
export default function App() {
  return (
    <HashRouter>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </StoreProvider>
    </HashRouter>
  );
}
