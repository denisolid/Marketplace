import { Router } from 'express';
import { checkDBHealth } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const dbHealth = await checkDBHealth();
  
  res.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    database: dbHealth,
  });
}));

export default router;