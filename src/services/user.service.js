// services/user.service.js

import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';

export const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const createStudentProfile = async (userId, studentData) => {
  const profile = new StudentProfile({
    ...studentData,
    userId,
  });
  await profile.save();
  return profile;
};

export const registerStudent = async (userData, studentProfileData) => {
  const user = await createUser(userData);
  const studentProfile = await createStudentProfile(
    user._id,
    studentProfileData,
  );
  return { user, studentProfile };
};

export const getUserWithProfile = async (userId) => {
  const user = await User.findById(userId).lean();
  const studentProfile = await StudentProfile.findOne({ userId }).lean();
  return { ...user, studentProfile };
};
