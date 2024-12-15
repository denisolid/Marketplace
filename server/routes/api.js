import { Router } from 'express';
import authRoutes from './auth.js';
import productRoutes from './products.js';
import orderRoutes from './orders.js';
import cartRoutes from './cart.js';
import healthRoutes from './health.js';
import { logger } from '../config/logger.js';

const router = Router();

// Log all API requests
router.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/health', healthRoutes);

// Handle 404 for unknown API routes
router.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'API endpoint not found'
  });
});

export default router;