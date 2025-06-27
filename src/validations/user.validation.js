import Joi from 'joi';

export const userValidationSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(
      'Admin',
      'Principal',
      'Vice Principal',
      'Teachers',
      'Class Teacher',
      'Student',
      'Parent/Guardian',
      'Librarian',
      'Accountant',
      'Transport Incharge',
      'Exam Coordinator',
    )
    .required(),
  address: Joi.object({
    street: Joi.string().trim().allow('', null),
    city: Joi.string().trim().allow('', null),
    state: Joi.string().trim().allow('', null),
    postalCode: Joi.string().trim().allow('', null),
    country: Joi.string().trim().default('India'),
  }).optional(),
});
