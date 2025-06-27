import express from 'express';
import { login, getCurrentUser } from '../controllers/auth.controller.js';
import { auth } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import authValidation from '../validations/auth.validation.js';

const router = express.Router();

router.post('/login', validate(authValidation.login), login);
router.get('/profile', auth, getCurrentUser);

export default router;
