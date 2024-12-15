import express from 'express';
import { register, login, googleAuth } from '../controllers/auth.controller.js';
import { validateRegister, validateLogin } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/google/callback', googleAuth);

export default router;