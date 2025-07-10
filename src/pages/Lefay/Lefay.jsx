// App.jsx (Main application file)
import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductCatalog from "./components/ProductCatalog";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

function Lefay() {
  return (
    <div className=" bg-gradient-to-br from-[#FFF8E1] via-[#B5EAD7] to-[#FFF8E1] min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <ProductCatalog />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default Lefay;
