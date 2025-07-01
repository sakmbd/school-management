import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { securityMiddleware } from './src/middlewares/security.js';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import passport from 'passport';
import logger from './src/config/logger.js';
import authRoutes from './src/routes/auth.routes.js';
import studentRoutes from './src/routes/student.routes.js';
import contactRoutes from './src/MicroServicesContact/routes/contacts.routes.js';
import { errorConverter, errorHandler } from './src/middlewares/error.js';
import './src/config/passport.js';

const app = express();

// Security
app.use(helmet());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      // Allow requests without origin (like from file://)
      return callback(null, true);
    }
    return callback(null, true); // allow all origins
  },
}));


app.use(securityMiddleware);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Logging
app.use(
  morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }),
);

// Passport
app.use(passport.initialize());

// Routes
app.use('/v1/api', authRoutes);
app.use('/v1/api/student', studentRoutes);
app.use('/v1/api/micro', contactRoutes);

// Error handling
app.use(errorConverter);
app.use(errorHandler);

export default app;
