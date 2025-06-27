import httpStatus from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';
import * as userService from '../services/user.service.js';

export const registerStudent = catchAsync(async (req, res) => {
  const { userData, studentProfileData } = req.body;

  if (!userData || !studentProfileData) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'userData and studentProfileData are required',
    );
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already registered');
  }

  const { user, studentProfile } = await userService.registerStudent(
    userData,
    studentProfileData,
  );

  res.status(httpStatus.CREATED).json({
    message: 'Student registered successfully',
    user,
    studentProfile,
  });
});

export const getStudentProfile = catchAsync(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
  }

  const profile = await userService.getUserWithProfile(userId);

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  res.status(httpStatus.OK).json({
    message: 'Student profile fetched successfully',
    data: profile,
  });
});
