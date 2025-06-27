import Joi from 'joi';

export const studentProfileValidationSchema = Joi.object({
  rollNumber: Joi.string().required(),
  class: Joi.string().required(),
  section: Joi.string().allow('', null),
  fatherName: Joi.string().allow('', null),
  motherName: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  dateOfBirth: Joi.date().iso().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  admissionDate: Joi.date().iso().optional(),
  emergencyContact: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message('Emergency contact must be a valid 10-digit number')
    .optional(),
});
