// middlewares/role.middleware.js
import httpStatus from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(httpStatus.FORBIDDEN, 'Access denied. You do not have permission to perform this action.')
      );
    }
    next();
  };
};
