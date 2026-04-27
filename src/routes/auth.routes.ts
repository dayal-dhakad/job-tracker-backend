import { Router } from 'express';
import {
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);

export default router;
