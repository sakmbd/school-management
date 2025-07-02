import httpStatus from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import * as userService from '../services/studentServices.js';

// Register new student
export const registerStudent = catchAsync(async (req, res) => {
  const { userData, studentProfileData } = req.body;

  if (!userData || !studentProfileData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required data');
  }

  const { user, studentProfile } = await userService.registerStudent(
    userData,
    studentProfileData,
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Student registered successfully',
    data: { user, studentProfile },
  });
});

// Get student profile
export const getStudentProfile = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const studentData = await userService.getUserWithProfile(studentId);

  if (!studentData || !studentData.studentProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  res.status(httpStatus.OK).json({
    success: true,
    data: studentData,
  });
});

// Get all students with filtering
export const getAllStudents = catchAsync(async (req, res) => {
  const students = await userService.getAllStudents(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// Promote student
export const promoteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const student = await userService.promoteStudent(studentId, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student promoted successfully',
    data: student,
  });
});

// Update student status
export const updateStudentStatus = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { status } = req.body;

  const student = await userService.updateStudentStatus(studentId, status);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student status updated successfully',
    data: student,
  });
});

// Update student profile
export const updateStudentProfile = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const student = await userService.updateStudentProfile(studentId, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student profile updated successfully',
    data: student,
  });
});

// Transfer student
export const transferStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const student = await userService.transferStudent(studentId, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student transferred successfully',
    data: student,
  });
});

// Archive student
export const archiveStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const student = await userService.archiveStudent(studentId);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student archived successfully',
    data: student,
  });
});

// Get academic history
export const getStudentAcademicHistory = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const history = await userService.getStudentAcademicHistory(studentId);

  res.status(httpStatus.OK).json({
    success: true,
    data: history,
  });
});
