const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
require("dotenv").config();

const products = [
  {
    name: "iPhone 15 Pro",
    description:
      "The most advanced iPhone yet with titanium design, A17 Pro chip, and professional camera system.",
    price: 999,
    originalPrice: 1099,
    category: "Smartphones",
    brand: "Apple",
    images: [
      { url: "/placeholder.svg?height=300&width=300", alt: "iPhone 15 Pro" },
    ],
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Chip: "A17 Pro",
      Storage: "128GB",
      Camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
    },
    stock: 50,
    rating: { average: 4.8, count: 1234 },
    featured: true,
  },
  {
    name: "MacBook Air M2",
    description:
      "Supercharged by M2 chip. Incredibly thin and light design with all-day battery life.",
    price: 1199,
    originalPrice: 1299,
    category: "Laptops",
    brand: "Apple",
    images: [
      { url: "/placeholder.svg?height=300&width=300", alt: "MacBook Air M2" },
    ],
    specifications: {
      Chip: "Apple M2",
      Display: "13.6-inch Liquid Retina",
      Memory: "8GB unified memory",
      Storage: "256GB SSD",
    },
    stock: 30,
    rating: { average: 4.9, count: 856 },
    featured: true,
  },
  {
    name: "AirPods Pro",
    description:
      "Active Noise Cancellation, Transparency mode, and spatial audio for an immersive experience.",
    price: 249,
    originalPrice: 279,
    category: "Audio",
    brand: "Apple",
    images: [
      { url: "/placeholder.svg?height=300&width=300", alt: "AirPods Pro" },
    ],
    specifications: {
      "Noise Cancellation": "Active",
      "Battery Life": "Up to 6 hours",
      "Charging Case": "MagSafe compatible",
      "Water Resistance": "IPX4",
    },
    stock: 100,
    rating: { average: 4.7, count: 2341 },
    featured: false,
  },
  {
    name: 'iPad Pro 12.9"',
    description:
      "The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    price: 1099,
    originalPrice: 1199,
    category: "Tablets",
    brand: "Apple",
    images: [{ url: "/placeholder.svg?height=300&width=300", alt: "iPad Pro" }],
    specifications: {
      Display: "12.9-inch Liquid Retina XDR",
      Chip: "Apple M2",
      Storage: "128GB",
      Camera: "12MP Wide + 10MP Ultra Wide",
    },
    stock: 25,
    rating: { average: 4.8, count: 567 },
    featured: true,
  },
  {
    name: "Samsung Galaxy S24",
    description:
      "Next-generation Galaxy with AI-powered features, advanced camera system, and premium design.",
    price: 899,
    originalPrice: 999,
    category: "Smartphones",
    brand: "Samsung",
    images: [
      {
        url: "/placeholder.svg?height=300&width=300",
        alt: "Samsung Galaxy S24",
      },
    ],
    specifications: {
      Display: "6.2-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      RAM: "8GB",
      Storage: "256GB",
    },
    stock: 0,
    rating: { average: 4.6, count: 789 },
    featured: false,
  },
  {
    name: "Sony WH-1000XM5",
    description:
      "Industry-leading noise canceling headphones with exceptional sound quality and comfort.",
    price: 399,
    originalPrice: 449,
    category: "Audio",
    brand: "Sony",
    images: [
      { url: "/placeholder.svg?height=300&width=300", alt: "Sony WH-1000XM5" },
    ],
    specifications: {
      "Noise Cancellation": "Industry-leading",
      "Battery Life": "Up to 30 hours",
      "Quick Charge": "3 min for 3 hours",
      Weight: "250g",
    },
    stock: 75,
    rating: { average: 4.9, count: 1456 },
    featured: false,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/mern-ecommerce"
    );
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing data");

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@techstore.com",
      password: "admin123",
      role: "admin",
    });
    await adminUser.save();
    console.log("Admin user created");

    // Create test user
    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: "test123",
      role: "user",
    });
    await testUser.save();
    console.log("Test user created");

    // Insert products
    await Product.insertMany(products);
    console.log("Products seeded successfully");

    console.log("Database seeded successfully!");
    console.log("Admin credentials: admin@techstore.com / admin123");
    console.log("Test user credentials: test@example.com / test123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
