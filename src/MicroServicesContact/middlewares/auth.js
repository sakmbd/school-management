import { StatusCodes } from 'http-status-codes';
import ApiError from '../../utils/ApiError.js';

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Authorization header missing or malformed',
      ),
    );
  }

  const token = authHeader.split(' ')[1];

  if (token !== process.env.STATIC_API_TOKEN) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid API token'));
  }

  next();
};
