import dotenv from 'dotenv';
import { createApp } from './config/app.js';
import connectDB from './config/database.js';
import { logger } from './config/logger.js';

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      logger.success(`Server running on port ${PORT}`);
      logger.info('Available endpoints:');
      logger.api(`http://localhost:${PORT}/api/health`);
      logger.api(`http://localhost:${PORT}/api/auth/login`);
      logger.api(`http://localhost:${PORT}/api/auth/register`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();