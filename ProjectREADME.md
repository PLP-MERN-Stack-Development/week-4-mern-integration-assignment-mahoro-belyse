# MERN Stack Ecommerce Application

A full-stack ecommerce application built with MongoDB, Express.js, React.js (Next.js), and Node.js.

## Features

### Frontend

- 🛍️ Modern, responsive ecommerce interface
- 🔐 User authentication (login/register)
- 🛒 Shopping cart functionality
- 📱 Mobile-friendly design
- 🔍 Product search and filtering
- ⭐ Product ratings and reviews
- 💳 Secure checkout process

### Backend

- 🚀 RESTful API with Express.js
- 🗄️ MongoDB database with Mongoose ODM
- 🔒 JWT-based authentication
- 🛡️ Input validation and sanitization
- 📊 Admin dashboard capabilities
- 🔄 Real-time cart synchronization

## Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd mern-ecommerce
   \`\`\`

2. **Install server dependencies**
   \`\`\`bash
   cd server
   npm install
   \`\`\`

3. **Install client dependencies**
   \`\`\`bash
   cd ../client
   npm install
   \`\`\`

4. **Environment Setup**

   Create \`.env\` file in the server directory:
   \`\`\`env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-ecommerce
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   \`\`\`

5. **Seed the database**
   \`\`\`bash
   cd server
   npm run seed
   \`\`\`

6. **Start the development servers**

   Terminal 1 (Backend):
   \`\`\`bash
   cd server
   npm run dev
   \`\`\`

   Terminal 2 (Frontend):
   \`\`\`bash
   cd client
   npm run dev
   \`\`\`

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication

- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user
- \`POST /api/auth/logout\` - Logout user
- \`GET /api/auth/me\` - Get current user

### Products

- \`GET /api/products\` - Get all products (with filtering)
- \`GET /api/products/:id\` - Get single product
- \`POST /api/products\` - Create product (Admin)
- \`PUT /api/products/:id\` - Update product (Admin)
- \`DELETE /api/products/:id\` - Delete product (Admin)

### Cart

- \`GET /api/cart\` - Get user cart
- \`POST /api/cart/add\` - Add item to cart
- \`PUT /api/cart/update\` - Update cart item
- \`DELETE /api/cart/remove/:productId\` - Remove item from cart
- \`DELETE /api/cart/clear\` - Clear cart

### Users

- \`GET /api/users/profile\` - Get user profile
- \`PUT /api/users/profile\` - Update user profile
- \`GET /api/users\` - Get all users (Admin)

## Default Credentials

After seeding the database:

- **Admin**: admin@techstore.com / admin123
- **Test User**: test@example.com / test123

## Project Structure

\`\`\`
mern-ecommerce/
├── client/ # Next.js frontend
│ ├── app/ # App router pages
│ ├── components/ # React components
│ ├── context/ # React context providers
│ ├── services/ # API services
│ └── ...
├── server/ # Express.js backend
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── middleware/ # Custom middleware
│ ├── scripts/ # Database scripts
│ └── server.js # Main server file
└── README.md
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
