import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../controllers/brand.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getBrands);
router.get('/:id', getBrandById);
router.post('/', protect, admin, upload.single('image'), createBrand);
router.put('/:id', protect, admin, upload.single('image'), updateBrand);
router.delete('/:id', protect, admin, deleteBrand);

export default router;