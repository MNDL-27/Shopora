import express from 'express';
import {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductCategories,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  productValidation,
  reviewValidation,
  validate,
} from '../middleware/validationMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/top', getTopProducts);
router.get('/categories', getProductCategories);
router.route('/:id').get(getProductById);

// Private routes
router.route('/:id/reviews').post(protect, reviewValidation, validate, createProductReview);

// Admin routes
router.route('/').post(protect, admin, productValidation, validate, createProduct);
router
  .route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
