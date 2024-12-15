import { AuthService } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { logger } from '../config/logger.js';

export const register = asyncHandler(async (req, res) => {
  const user = await AuthService.register(req.body);
  logger.success(`User registered successfully: ${user.email}`);
  
  res.status(201).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token: user.token
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthService.login(email, password);
  logger.success(`User logged in successfully: ${user.email}`);

  res.json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token: user.token
    }
  });
});

export const googleAuth = asyncHandler(async (req, res) => {
  const { code } = req.query;
  const user = await AuthService.googleAuth(code);
  logger.success(`User authenticated via Google: ${user.email}`);

  res.json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token: user.token
    }
  });
});