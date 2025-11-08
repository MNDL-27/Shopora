# ⚡ ElectroShop - Modern Electronics E-Commerce Platform

<div align="center">

![ElectroShop](https://img.shields.io/badge/ElectroShop-v1.0.0-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

A full-stack modern electronics e-commerce platform built with the MERN stack. Shop for the latest smartphones, laptops, gaming gear, audio equipment, and tech accessories.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation)

</div>

---

## 🎯 Features

### Sample Products
The seeder includes 20 electronics products across categories:
- **Smartphones**: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra
- **Laptops**: MacBook Pro M3, Dell XPS 15, Surface Pro 9
- **Gaming**: PlayStation 5, Nintendo Switch OLED, Gaming peripherals
- **Audio**: Sony WH-1000XM5, AirPods Pro, Galaxy Buds2 Pro
- **Cameras**: Canon EOS R5, GoPro HERO12, DJI Mini 4 Pro
- **Smart Home**: Amazon Echo, Smart displays
- **Accessories**: Mice, keyboards, monitors, and more

### 👤 User Features
- **Authentication System**: JWT-based secure login and registration
- **User Dashboard**: Order history, profile management, and saved addresses
- **Product Reviews**: Rate and review purchased products
- **Wishlist**: Save favorite electronics for later

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Modern transitions and hover effects
- **Glassmorphism**: Contemporary design with frosted glass effects
- **Fast Performance**: Optimized loading and rendering

### 🔐 Security & Admin
- **Admin Dashboard**: Manage products, orders, and users
- **Secure Payments**: Ready for Stripe/PayPal integration
- **Data Protection**: Password hashing, JWT tokens, and secure headers
- **Order Management**: Track and update order statuses

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server and REST API
- **MongoDB** with **Mongoose** - NoSQL Database
- **Prisma ORM** - Modern database toolkit (Optional, supports PostgreSQL, MySQL, SQLite, MongoDB) - [Setup Guide](PRISMA_SETUP.md)
- **JWT** - Authentication tokens
- **bcrypt.js** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **Morgan** - HTTP request logging

### Frontend
- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Development Tools
- **Nodemon** - Auto-restart server
- **Concurrently** - Run multiple commands
- **ESLint** & **Prettier** - Code quality
- **Jest** & **Cypress** - Testing (configured)

---