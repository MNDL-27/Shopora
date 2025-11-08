import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './config/db.js';
import i18next from './i18n.js';
import i18nextMiddleware from 'i18next-http-middleware';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import configRoutes from './routes/configRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().catch(err => {
  console.error('MongoDB connection failed:', err.message);
  console.log('⚠️  Running without database - some features may not work');
  console.log('💡 To fix: Set up MongoDB Atlas and update MONGO_URI in .env');
});

const app = express();

// i18n middleware - attach t function to requests
app.use(i18nextMiddleware.handle(i18next));

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Shopora API is running...' });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/config', configRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

export default app;
