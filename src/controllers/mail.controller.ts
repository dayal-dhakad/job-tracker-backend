// src/controllers/mail.controller.ts

import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Application } from '../models/application.model.js';
import { sendMail } from '../services/mail.service.js';
import ScheduledMail from '../models/ScheduledMail.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { resolveResumeTemplatePath } from '../utils/resumeTemplate.utils.js';

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

const validateMailBody = (body: MailRequestBody) => {
  const { applicationId, to, subject, body: emailBody } = body;

  if (!applicationId || !mongoose.Types.ObjectId.isValid(applicationId)) {
    throw new AppError('Valid applicationId is required', 400);
  }

  if (!to?.trim()) {
    throw new AppError('Recipient email is required', 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim())) {
    throw new AppError('Valid recipient email is required', 400);
  }

  if (!subject?.trim()) {
    throw new AppError('Subject is required', 400);
  }

  if (!emailBody?.trim()) {
    throw new AppError('Email body is required', 400);
  }

  const resumeTemplateId = body.resumeTemplateId || body.resumeFilename;

  if (!resumeTemplateId?.trim()) {
    throw new AppError('Resume is required', 400);
  }

  return {
    applicationId,
    to: to.trim(),
    subject: subject.trim(),
    body: emailBody,
    resumeTemplateId: resumeTemplateId.trim(),
  };
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
  const mailBody = validateMailBody(req.body as MailRequestBody);
  await getOwnedApplication(mailBody.applicationId, userId);

  const selectedResume = resolveResumeTemplatePath(mailBody.resumeTemplateId);

  await sendMail({
    to: mailBody.to,
    subject: mailBody.subject,
    body: mailBody.body,
    attachments: [
      {
        filename: selectedResume.filename,
        path: selectedResume.path,
      },
    ],
  });

  await Application.findByIdAndUpdate(mailBody.applicationId, {
    status: 'sent',
    lastEmailSentAt: new Date(),
  });

  res.status(200).json({
    success: true,
    message: 'Mail sent successfully',
  });
});

export const scheduleApplicationMail = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const mailBody = validateMailBody(req.body as MailRequestBody);
  const { scheduledAt } = req.body as { scheduledAt?: string };
  const scheduledDate = scheduledAt ? new Date(scheduledAt) : null;

  if (!scheduledDate || Number.isNaN(scheduledDate.getTime())) {
    throw new AppError('Valid scheduledAt date is required', 400);
  }

  if (scheduledDate <= new Date()) {
    throw new AppError('Scheduled time must be in the future', 400);
  }

  await getOwnedApplication(mailBody.applicationId, userId);
  resolveResumeTemplatePath(mailBody.resumeTemplateId);

  const scheduledMail = await ScheduledMail.create({
    user: userId,
    application: mailBody.applicationId,
    to: mailBody.to,
    subject: mailBody.subject,
    body: mailBody.body,
    resumeTemplateId: mailBody.resumeTemplateId,
    scheduledAt: scheduledDate,
    status: 'pending',
  });

  await Application.findByIdAndUpdate(mailBody.applicationId, {
    status: 'ready',
    followUpDate: scheduledDate,
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
