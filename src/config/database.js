import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

export default connectDB;