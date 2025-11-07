import express from 'express';

const router = express.Router();

// @desc    Get Stripe publishable key
// @route   GET /api/config/stripe
// @access  Public
router.get('/stripe', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '' });
});

// @desc    Get app configuration
// @route   GET /api/config
// @access  Public
router.get('/', (req, res) => {
  res.json({
    appName: 'Shopora',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    features: {
      emailNotifications: Boolean(process.env.EMAIL_USER),
      imageUpload: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
      stripePayments: Boolean(process.env.STRIPE_SECRET_KEY),
    },
  });
});

export default router;
