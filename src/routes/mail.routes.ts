// src/routes/mail.routes.ts
import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  getScheduledMails,
  scheduleApplicationMail,
  sendApplicationMail,
} from '../controllers/mail.controller.js';

const router = express.Router();

router.get('/scheduled', protect, getScheduledMails);
router.post('/send', protect, sendApplicationMail);
router.post('/schedule', protect, scheduleApplicationMail);

export default router;
