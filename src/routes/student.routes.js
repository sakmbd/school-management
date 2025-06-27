import express from 'express';
import {
  registerStudent,
  getStudentProfile,
} from '../controllers/student.controller.js';
import { auth } from '../middlewares/auth.js';
import { checkRole } from '../middlewares/role.js';
import validate from '../middlewares/validate.js';
import { registerStudentSchema } from '../validations/studentRegister.validation.js';

const router = express.Router();

// Only Admin can register students
router.post(
  '/register',
  auth,
  checkRole(['Admin', 'Principal', 'Vice Principal', 'Class Teacher']),
  validate(registerStudentSchema),
  registerStudent,
);

// Admin and Student can fetch student profiles
router.get(
  '/profile/:userId',
  auth,
  checkRole([
    'Admin',
    'Principal',
    'Vice Principal',
    'Class Teacher',
    'Student',
  ]),
  getStudentProfile,
);

export default router;
