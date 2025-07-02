import Joi from 'joi';
import { userValidationSchema } from './user.validation.js';

const studentProfileValidationSchema = Joi.object({
  // Core student information
  rollNumber: Joi.string()
    .required()
    .pattern(/^[A-Z0-9\-]+$/)
    .message('Roll number must contain only letters, numbers, and hyphens'),
  class: Joi.string().required().max(10),
  section: Joi.string().required().max(2).uppercase(),

  // Personal details
  fatherName: Joi.string().required().min(2).max(100),
  motherName: Joi.string().required().min(2).max(100),
  dateOfBirth: Joi.date().required().max(new Date()),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),

  // School information
  admissionDate: Joi.date().default(Date.now),
  emergencyContact: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .message('Emergency contact must be a valid 10-15 digit number')
    .required(),

  // Academic status
  academicStatus: Joi.string()
    .valid('active', 'suspended', 'reinstated', 'withdrawn')
    .default('active'),
  currentAcademicYear: Joi.string()
    .pattern(/^\d{4}-\d{4}$/)
    .message('Academic year must be in YYYY-YYYY format')
    .optional(),
});

export const registerStudentSchema = Joi.object({
  userData: userValidationSchema.required(),
  studentProfileData: studentProfileValidationSchema.required(),
});

export const promoteStudentSchema = Joi.object({
  type: Joi.string().valid('promotion').required().messages({
    'any.only': 'Type must be "promotion"',
    'any.required': 'Type is required',
  }),
  data: Joi.object({
    toClass: Joi.string().required().max(10).messages({
      'string.empty': 'Target class cannot be empty',
      'any.required': 'Target class is required',
      'string.max': 'Class name cannot exceed {#limit} characters',
    }),
    toSection: Joi.string().max(2).uppercase().messages({
      'string.max': 'Section cannot exceed {#limit} characters',
      'string.uppercase': 'Section must be uppercase',
    }),
    year: Joi.string()
      .pattern(/^\d{4}-\d{4}$/)
      .message('Academic year must be in YYYY-YYYY format'),
    remarks: Joi.string().max(500).allow('', null).messages({
      'string.max': 'Remarks cannot exceed {#limit} characters',
    }),
    approvedBy: Joi.string().email().max(100).allow(null).messages({
      'string.email': 'Approver must be a valid email',
      'string.max': 'Approver email cannot exceed {#limit} characters',
    }),
    effectiveDate: Joi.date()
      .min('now')
      .default(() => new Date())
      .messages({
        'date.min': 'Effective date must be in the future',
        'date.base': 'Invalid date format',
      }),
  })
    .required()
    .messages({
      'object.base': 'Promotion data must be an object',
    }),
}).options({ stripUnknown: true });

export const updateStudentStatusSchema = Joi.object({
  status: Joi.string()
    .valid('active', 'suspended', 'reinstated', 'withdrawn')
    .required(),
});

export const updateStudentProfileSchema = Joi.object({
  // Only include fields that can be updated
  rollNumber: Joi.forbidden(), // Roll number shouldn't be changed
  class: Joi.string().max(10),
  section: Joi.string().max(2).uppercase(),
  fatherName: Joi.string().min(2).max(100),
  motherName: Joi.string().min(2).max(100),
  emergencyContact: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .message('Emergency contact must be a valid 10-15 digit number'),
  academicStatus: Joi.string().valid(
    'active',
    'suspended',
    'reinstated',
    'withdrawn',
  ),
  currentAcademicYear: Joi.string().pattern(/^\d{4}-\d{4}$/),
}).min(1); // At least one field required for update

export const transferStudentSchema = Joi.object({
  type: Joi.string().valid('transfer').required().messages({
    'any.only': 'Type must be "transfer" for this operation',
    'any.required': 'Type is required',
  }),
  data: Joi.object({
    toClass: Joi.string().required().max(10).messages({
      'string.empty': 'Target class cannot be empty',
      'any.required': 'Target class is required',
    }),
    toSection: Joi.string().required().max(2).uppercase().messages({
      'string.empty': 'Target section cannot be empty',
      'any.required': 'Target section is required',
    }),
    reason: Joi.string().max(500).allow('', null).messages({
      'string.max': 'Reason cannot exceed 500 characters',
    }),
    effectiveDate: Joi.date()
      .min('now')
      .default(() => new Date())
      .messages({
        'date.min': 'Effective date must be in the future',
      }),
    // Additional transfer-specific fields
    initiatedBy: Joi.string().max(100).messages({
      'string.max': 'Initiator name cannot exceed 100 characters',
    }),
    approved: Joi.boolean().default(false),
  })
    .required()
    .messages({
      'object.base': 'Transfer data must be an object',
    }),
});

// // Registration
// validate(registerStudentSchema)
// // Promotion
// validate(promoteStudentSchema)
// // Status update
// validate(updateStudentStatusSchema)
// // Profile update
// validate(updateStudentProfileSchema)
