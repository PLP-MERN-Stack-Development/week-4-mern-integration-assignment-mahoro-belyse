import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm opacity-90">
                Trusted by 10,000+ customers
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Latest Tech at
              <span className="block text-yellow-400">Unbeatable Prices</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 max-w-lg">
              Discover cutting-edge electronics, gadgets, and accessories. Free
              shipping on orders over $50 and 30-day returns guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                View Deals
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-75">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-75">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm opacity-75">Shipping</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Latest Tech Products"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                30% OFF
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
