// validations/contact.validation.js
import Joi from 'joi';

const contactTypes = ['work', 'home'];

export default {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    search: Joi.string().allow('', null),
    type: Joi.string().valid('home', 'work').optional(),
  }),

  create: Joi.object({
    name: Joi.string().trim().required(),
    phone: Joi.string().trim().required(), // You can use regex here if you want strict phone format
    address: Joi.string().allow('', null),
    type: Joi.string()
      .valid(...contactTypes)
      .required(),
  }),

  update: Joi.object({
    name: Joi.string().trim().optional(),
    phone: Joi.string().trim().optional(),
    address: Joi.string().allow('', null).optional(),
    type: Joi.string()
      .valid(...contactTypes)
      .optional(),
  }),
};
