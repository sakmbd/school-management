import httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = (req, res) => {
  res.json(req.user);
};
