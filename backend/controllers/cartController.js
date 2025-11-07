import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');

  if (user) {
    res.json(user.cart);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    res.status(400);
    throw new Error('Product ID and quantity are required');
  }

  // Check if product exists and has sufficient stock
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.countInStock < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  const user = await User.findById(req.user._id);

  // Check if item already exists in cart
  const existingItemIndex = user.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity
    const newQuantity = user.cart[existingItemIndex].quantity + quantity;
    
    if (product.countInStock < newQuantity) {
      res.status(400);
      throw new Error('Insufficient stock');
    }

    user.cart[existingItemIndex].quantity = newQuantity;
  } else {
    // Add new item
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  await user.populate('cart.product');

  res.json(user.cart);
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error('Invalid quantity');
  }

  // Check product stock
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.countInStock < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  const user = await User.findById(req.user._id);
  const itemIndex = user.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    user.cart[itemIndex].quantity = quantity;
    await user.save();
    await user.populate('cart.product');
    res.json(user.cart);
  } else {
    res.status(404);
    throw new Error('Item not found in cart');
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();
  await user.populate('cart.product');

  res.json(user.cart);
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = [];
  await user.save();

  res.json({ message: 'Cart cleared' });
});

export { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
