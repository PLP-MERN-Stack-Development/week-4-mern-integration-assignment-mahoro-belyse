"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1099,
    image: "/placeholder.svg?height=300&width=300",
    category: "Smartphones",
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 1199,
    originalPrice: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Laptops",
    rating: 4.9,
    reviews: 856,
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249,
    originalPrice: 279,
    image: "/placeholder.svg?height=300&width=300",
    category: "Audio",
    rating: 4.7,
    reviews: 2341,
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    price: 1099,
    originalPrice: 1199,
    image: "/placeholder.svg?height=300&width=300",
    category: "Tablets",
    rating: 4.8,
    reviews: 567,
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    name: "Samsung Galaxy S24",
    price: 899,
    originalPrice: 999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Smartphones",
    rating: 4.6,
    reviews: 789,
    inStock: false,
    featured: false,
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    price: 399,
    originalPrice: 449,
    image: "/placeholder.svg?height=300&width=300",
    category: "Audio",
    rating: 4.9,
    reviews: 1456,
    inStock: true,
    featured: false,
  },
];

export default function ProductGrid() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        filtered = [...filtered].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, products]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Featured Products
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of the latest and greatest tech
          products
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button size="lg" variant="outline">
          Load More Products
        </Button>
      </div>
    </div>
  );
}
