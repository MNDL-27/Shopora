# 🚀 Quick Start Guide

## Prerequisites Check

Make sure you have:
- ✅ Node.js v16+ installed
- ✅ MongoDB running (local) or MongoDB Atlas account
- ✅ npm or yarn

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install --legacy-peer-deps
cd ..
```

### 2. Configure Environment

**Backend (.env in root):**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopora
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

**Frontend (frontend/.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas**
- Create a free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Get connection string and update `MONGO_URI` in `.env`

### 4. Seed Database (Optional)

```bash
npm run seed
```

This creates demo accounts:
- **User**: user@example.com / password123
- **Admin**: admin@example.com / password123

### 5. Start the Application

```bash
npm run dev
```

This runs both frontend and backend concurrently.

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## Testing the Application

### Test User Features
1. Go to http://localhost:5173
2. Browse products on the home page
3. Click "Products" to see the full catalog
4. Use search and filters
5. Click on a product to view details
6. Add products to cart
7. Login with: user@example.com / password123
8. Complete checkout process

### Test Admin Features
1. Login with: admin@example.com / password123
2. Access admin routes (to be implemented in future updates)

## Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- For Atlas, verify IP whitelist

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Not Loading
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

## Development Workflow

### Running Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### Watching for Changes
- Backend: Nodemon auto-restarts on file changes
- Frontend: Vite HMR updates instantly

### Linting & Formatting
```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Production Build

### Frontend
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

### Backend
Set `NODE_ENV=production` and deploy with your preferred service.

## Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints documentation
- Check console logs for errors
- Ensure all environment variables are set

## Next Steps

1. ✅ Test all features
2. ✅ Customize the design
3. ✅ Add more products
4. ✅ Configure payment gateway
5. ✅ Set up email service
6. ✅ Deploy to production

Happy coding! 🎉
