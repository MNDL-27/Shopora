#!/bin/bash

# Shopora Setup Script
# This script helps set up the development environment

echo "🛍️  Shopora Setup Script"
echo "========================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "  Node.js $NODE_VERSION is installed ✓"
else
    echo "  ✗ Node.js is not installed"
    echo "  Please install Node.js from https://nodejs.org"
    exit 1
fi

# Check npm
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "  npm $NPM_VERSION is installed ✓"
else
    echo "  ✗ npm is not installed"
    exit 1
fi

# Check MongoDB
echo "✓ Checking MongoDB..."
if command -v mongod &> /dev/null; then
    MONGO_VERSION=$(mongod --version | head -n 1)
    echo "  MongoDB is installed ✓"
    echo "  $MONGO_VERSION"
else
    echo "  ⚠ MongoDB is not installed locally"
    echo ""
    echo "  Options:"
    echo "  1. Install MongoDB locally:"
    echo "     - macOS: brew install mongodb-community"
    echo "     - Linux: sudo apt-get install mongodb"
    echo "     - Windows: Download from https://www.mongodb.com/try/download/community"
    echo ""
    echo "  2. Use MongoDB Atlas (Free Cloud Database):"
    echo "     - Sign up at https://www.mongodb.com/cloud/atlas"
    echo "     - Create a free cluster"
    echo "     - Get connection string"
    echo "     - Update MONGO_URI in .env file"
    echo ""
fi

# Install root dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "  Root dependencies installed ✓"
else
    echo "  ✗ Failed to install root dependencies"
    exit 1
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install --legacy-peer-deps

if [ $? -eq 0 ]; then
    echo "  Frontend dependencies installed ✓"
else
    echo "  ✗ Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Check .env file
echo ""
echo "⚙️  Checking environment configuration..."
if [ -f .env ]; then
    echo "  .env file exists ✓"
    echo "  Please verify your configuration in .env file"
else
    echo "  ⚠ .env file not found"
    echo "  Creating .env from .env.example..."
    cp .env.example .env
    echo "  Please update .env with your configuration"
fi

# Check frontend .env file
if [ -f frontend/.env ]; then
    echo "  frontend/.env file exists ✓"
else
    echo "  ⚠ frontend/.env file not found"
    echo "  Creating frontend/.env..."
    echo "VITE_API_URL=http://localhost:5000/api" > frontend/.env
fi

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Start MongoDB (if using local):"
echo "   - macOS: brew services start mongodb-community"
echo "   - Linux: sudo systemctl start mongod"
echo "   - Windows: net start MongoDB"
echo ""
echo "2. Seed the database (optional):"
echo "   npm run seed"
echo ""
echo "3. Start the application:"
echo "   npm run dev"
echo ""
echo "4. Open in browser:"
echo "   Frontend: http://localhost:5173"
echo "   Backend: http://localhost:5000/api"
echo ""
echo "For detailed instructions, see QUICKSTART.md"
echo ""
