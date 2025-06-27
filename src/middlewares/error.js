// middlewares/error

import httpStatus from 'http-status-codes';
import logger from '../config/logger.js';

export const errorConverter = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.statusCode).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
