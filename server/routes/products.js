import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/product.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;