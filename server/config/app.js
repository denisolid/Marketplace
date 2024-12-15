import express from 'express';
import cors from 'cors';
import { CORS_OPTIONS } from './constants.js';
import apiRoutes from '../routes/api.js';
import { errorHandler } from '../middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors(CORS_OPTIONS));
  app.use(express.json());

  // Routes
  app.use('/api', apiRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'success',
      message: 'Server is running',
      timestamp: new Date().toISOString()
    });
  });

  // Error handler
  app.use(errorHandler);

  return app;
}