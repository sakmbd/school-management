import httpStatus from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export default (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  next();
};