import express from 'express';
import userController from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import contactValidation from '../validations/contact.validation.js';

const router = express.Router();

router.get(
  '/contact',
  auth,
  validate(contactValidation.query),
  userController.getContacts,
);
router.post(
  '/contact',
  auth,
  validate(contactValidation.create),
  userController.saveContacts,
);
router.put(
  '/contact/:id',
  auth,
  validate(contactValidation.update),
  userController.updateContacts,
);
router.delete('/contact/:id', auth, userController.deleteContacts);

export default router;
