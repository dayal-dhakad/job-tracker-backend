// src/controllers/mail.controller.ts

import type { Request, Response } from 'express';
import { Application } from '../models/application.model.js';
import ScheduledMail from '../models/ScheduledMail.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import {
  parseScheduledAt,
  queueApplicationMail,
  sendApplicationMailNow,
  validateApplicationMailPayload,
} from '../services/applicationMail.service.js';

type MailRequestBody = {
  applicationId?: string;
  to?: string;
  subject?: string;
  body?: string;
  resumeTemplateId?: string;
  resumeFilename?: string;
};

const getAuthenticatedUserId = (req: Request) => {
  if (!req.user?.userId) {
    throw new AppError('Unauthorized', 401);
  }

  return req.user.userId;
};

const getOwnedApplication = async (applicationId: string, userId: string) => {
  const application = await Application.findOne({ _id: applicationId, user: userId });

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  return application;
};

export const sendApplicationMail = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const mailBody = validateApplicationMailPayload(req.body as MailRequestBody);
  const application = await getOwnedApplication(mailBody.applicationId, userId);

  await sendApplicationMailNow({ application, payload: mailBody });

  res.status(200).json({
    success: true,
    message: 'Mail sent successfully',
  });
});

export const scheduleApplicationMail = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const mailBody = validateApplicationMailPayload(req.body as MailRequestBody);
  const { scheduledAt } = req.body as { scheduledAt?: string };
  const scheduledDate = parseScheduledAt(scheduledAt);

  if (!scheduledDate) {
    throw new AppError('Valid scheduledAt date is required', 400);
  }

  const application = await getOwnedApplication(mailBody.applicationId, userId);
  const scheduledMail = await queueApplicationMail({
    application,
    payload: mailBody,
    scheduledAt: scheduledDate,
    userId,
  });

  res.status(201).json({
    success: true,
    message: 'Mail scheduled successfully',
    data: scheduledMail,
  });
});

export const getScheduledMails = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);

  const scheduledMails = await ScheduledMail.find({ user: userId })
    .populate({
      path: 'application',
      select:
        'companyName companyWebsite recruiterName recruiterEmail jobTitle jobUrl location workMode source applicationType status priority subject emailBody appliedAt lastEmailSentAt followUpDate notes tags createdAt updatedAt',
    })
    .sort({ scheduledAt: 1 });

  res.status(200).json({
    success: true,
    message: 'Scheduled mails fetched successfully',
    data: scheduledMails,
  });
});
