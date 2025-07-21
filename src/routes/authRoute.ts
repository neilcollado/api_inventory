import express from 'express';
import * as User from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', User.register);
router.post('/login', User.login);
router.post('/profile', authenticate, User.getProfile);

export default router;
