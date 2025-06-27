import { userValidationSchema } from './user.validation.js';
import { studentProfileValidationSchema } from './studentProfile.validation.js';
import Joi from 'joi';

export const registerStudentSchema = Joi.object({
  userData: userValidationSchema.required(),
  studentProfileData: studentProfileValidationSchema.required(),
});
