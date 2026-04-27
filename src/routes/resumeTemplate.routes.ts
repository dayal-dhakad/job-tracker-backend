import { Router } from 'express';
import { getResumeTemplates } from '../controllers/resumeTemplate.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', protect, getResumeTemplates);

export default router;
