"use client";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export default function HomePage() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Hero />
          <main className="container mx-auto px-4 py-8">
            <ProductGrid />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
