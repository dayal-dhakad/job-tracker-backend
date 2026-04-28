import { Router } from 'express';
import {
  createApplication,
  getApplicationById,
  getApplications,
} from '../controllers/application.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', protect, getApplications);
router.get('/:applicationId', protect, getApplicationById);
router.post('/', protect, createApplication);

export default router;
