import express from 'express';
import {
  registerStudent,
  getStudentProfile,
  getAllStudents,
  promoteStudent,
  updateStudentStatus,
  updateStudentProfile,
  transferStudent,
  archiveStudent,
  getStudentAcademicHistory,
} from '../controllers/student.controller.js';
import { auth } from '../middlewares/auth.js';
import { checkRole } from '../middlewares/role.js';
import validate from '../middlewares/validate.js';
import {
  registerStudentSchema,
  promoteStudentSchema,
  updateStudentStatusSchema,
  updateStudentProfileSchema,
  transferStudentSchema,
} from '../validations/studentRegister.validation.js';

const router = express.Router();

// Student Registration - Admin/Principal/Vice Principal/Class Teacher
router.post(
  '/register',
  auth,
  checkRole(['Admin', 'Principal', 'Vice Principal', 'Class Teacher']),
  validate(registerStudentSchema),
  registerStudent,
);

// Get All Students with Filtering - Admin/Teachers
router.get(
  '/',
  auth,
  checkRole([
    'Admin',
    'Principal',
    'Vice Principal',
    'Class Teacher',
    'Teacher',
  ]),
  getAllStudents,
);

// Get Student Profile - Admin/Teachers/Student Self
router.get(
  '/profile/:studentId',
  auth,
  checkRole([
    'Admin',
    'Principal',
    'Vice Principal',
    'Class Teacher',
    'Teacher',
    'Student',
  ]),
  getStudentProfile,
);

// Promote Student - Admin/Principal/Vice Principal
router.patch(
  '/:studentId/promote',
  auth,
  checkRole(['Admin', 'Principal', 'Vice Principal']),
  validate(promoteStudentSchema),
  promoteStudent,
);

// Update Student Status - Admin/Principal/Vice Principal
router.patch(
  '/:studentId/status',
  auth,
  checkRole(['Admin', 'Principal', 'Vice Principal']),
  validate(updateStudentStatusSchema),
  updateStudentStatus,
);

// Update Student Profile - Admin/Class Teacher
router.patch(
  '/:studentId/profile',
  auth,
  checkRole(['Admin', 'Principal', 'Vice Principal', 'Class Teacher']),
  validate(updateStudentProfileSchema),
  updateStudentProfile,
);

// Transfer Student to Another Class - Admin/Principal/Vice Principal
router.patch(
  '/:studentId/transfer',
  auth,
  checkRole(['Admin', 'Principal', 'Vice Principal']),
  validate(transferStudentSchema),
  transferStudent,
);

// Archive Student (Soft Delete) - Admin/Principal
router.delete(
  '/:studentId',
  auth,
  checkRole(['Admin', 'Principal']),
  archiveStudent,
);

// Get Student Academic History - Admin/Teachers
router.get(
  '/:studentId/history',
  auth,
  checkRole(['Admin', 'Principal', 'Vice Principal', 'Class Teacher']),
  getStudentAcademicHistory,
);

export default router;
