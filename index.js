import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import app from './app.js';
import logger from './src/config/logger.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Server failed to start:', err);
    process.exit(1);
  });
