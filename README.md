# 🛍️ Shopora - Modern E-Commerce Platform

A full-stack, production-ready e-commerce web application built with the MERN stack (MongoDB, Express.js, React, and Node.js). Features a modern, responsive UI with dark mode, complete shopping cart functionality, user authentication, admin dashboard, and payment integration.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## ✨ Features

### Frontend Features
- 🎨 **Modern UI/UX** - Built with React and Tailwind CSS
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🛒 **Shopping Cart** - Add, update, and remove items with persistent storage
- 🔍 **Advanced Search & Filters** - Search by keyword, filter by category, price range, and sort options
- ⭐ **Product Reviews & Ratings** - Customer reviews with star ratings
- 🔐 **User Authentication** - Secure JWT-based login and registration
- 👤 **User Dashboard** - View and manage orders and profile
- 💳 **Checkout Flow** - Complete checkout process with shipping and payment

### Backend Features
- 🚀 **RESTful API** - Clean, well-documented API endpoints
- 🔒 **JWT Authentication** - Secure token-based authentication
- 🛡️ **Security** - Bcrypt password hashing, Helmet, CORS
- 📊 **Database** - MongoDB with Mongoose ODM
- ✅ **Input Validation** - Express-validator for request validation
- 📄 **Pagination** - Efficient data fetching with pagination
- 🌱 **Database Seeding** - Sample data for testing

## 🛠️ Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router, Context API, Axios, React Icons, React Toastify

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Express Validator, Morgan, Helmet, CORS

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Shopora.git
   cd Shopora
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install --legacy-peer-deps
   cd ..
   ```

3. **Environment Setup**

   Create `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shopora
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   ```

   Create `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Seed the Database** (Optional)
   ```bash
   npm run seed
   ```

   Demo credentials:
   - **User**: user@example.com / password123
   - **Admin**: admin@example.com / password123

5. **Start the Application**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📚 API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get user profile (Auth)
- `PUT /profile` - Update profile (Auth)

### Product Routes (`/api/products`)
- `GET /` - Get all products (supports filtering, search, pagination)
- `GET /:id` - Get product details
- `POST /:id/reviews` - Add product review (Auth)

### Order Routes (`/api/orders`)
- `POST /` - Create order (Auth)
- `GET /myorders` - Get user orders (Auth)
- `GET /:id` - Get order details (Auth)

### Cart Routes (`/api/cart`)
- `GET /` - Get cart (Auth)
- `POST /` - Add to cart (Auth)
- `PUT /:productId` - Update cart item (Auth)
- `DELETE /:productId` - Remove from cart (Auth)

## 📦 Available Scripts

**Root Level:**
- `npm run dev` - Run both frontend and backend
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm run seed` - Seed database
- `npm run seed:destroy` - Clear database

**Frontend:**
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Made with ❤️ using the MERN Stack

