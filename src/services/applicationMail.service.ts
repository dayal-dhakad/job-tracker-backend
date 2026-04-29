import mongoose from 'mongoose';
import type { IApplication } from '../models/application.model.js';
import { Application } from '../models/application.model.js';
import ScheduledMail from '../models/ScheduledMail.js';
import { sendMail } from './mail.service.js';
import { AppError } from '../utils/AppError.js';
import { resolveResumeTemplatePath } from '../utils/resumeTemplate.utils.js';

export type ApplicationMailPayload = {
  applicationId?: string | undefined;
  to?: string | undefined;
  subject?: string | undefined;
  body?: string | undefined;
  resumeTemplateId?: string | undefined;
  resumeFilename?: string | undefined;
  scheduledAt?: string | undefined;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateApplicationMailPayload = (payload: ApplicationMailPayload) => {
  const resumeTemplateId = payload.resumeTemplateId || payload.resumeFilename;

  if (!payload.applicationId || !mongoose.Types.ObjectId.isValid(payload.applicationId)) {
    throw new AppError('Valid applicationId is required', 400);
  }

  if (!payload.to?.trim()) {
    throw new AppError('Recipient email is required', 400);
  }

  if (!emailRegex.test(payload.to.trim())) {
    throw new AppError('Valid recipient email is required', 400);
  }

  if (!payload.subject?.trim()) {
    throw new AppError('Subject is required', 400);
  }

  if (!payload.body?.trim()) {
    throw new AppError('Email body is required', 400);
  }

  if (!resumeTemplateId?.trim()) {
    throw new AppError('Resume is required', 400);
  }

  return {
    applicationId: payload.applicationId,
    to: payload.to.trim(),
    subject: payload.subject.trim(),
    body: payload.body,
    resumeTemplateId: resumeTemplateId.trim(),
  };
};

export const parseScheduledAt = (scheduledAt?: string) => {
  if (!scheduledAt?.trim()) {
    return null;
  }

  const scheduledDate = new Date(scheduledAt);

  if (Number.isNaN(scheduledDate.getTime())) {
    throw new AppError('Valid scheduledAt date is required', 400);
  }

  if (scheduledDate <= new Date()) {
    throw new AppError('Scheduled time must be in the future', 400);
  }

  return scheduledDate;
};

export const queueApplicationMail = async ({
  application,
  payload,
  scheduledAt,
  userId,
}: {
  application: IApplication;
  payload: ReturnType<typeof validateApplicationMailPayload>;
  scheduledAt: Date;
  userId: string;
}) => {
  if (application.lastEmailSentAt || application.status === 'sent') {
    throw new AppError('Mail has already been sent for this application', 409);
  }

  const existingPendingMail = await ScheduledMail.findOne({
    application: application._id,
    status: 'pending',
  });

  if (existingPendingMail) {
    throw new AppError('Mail is already scheduled for this application', 409);
  }

  resolveResumeTemplatePath(payload.resumeTemplateId);

  const scheduledMail = await ScheduledMail.create({
    user: userId,
    application: application._id,
    to: payload.to,
    subject: payload.subject,
    body: payload.body,
    resumeTemplateId: payload.resumeTemplateId,
    scheduledAt,
    status: 'pending',
  });

  await Application.findByIdAndUpdate(application._id, {
    status: 'ready',
    followUpDate: scheduledAt,
  });

  return scheduledMail;
};

export const sendApplicationMailNow = async ({
  application,
  payload,
}: {
  application: IApplication;
  payload: ReturnType<typeof validateApplicationMailPayload>;
}) => {
  console.log('asend application nmail now hitl ');

  if (application.lastEmailSentAt || application.status === 'sent') {
    throw new AppError('Mail has already been sent for this application', 409);
  }

  const existingPendingMail = await ScheduledMail.findOne({
    application: application._id,
    status: 'pending',
  });

  if (existingPendingMail) {
    throw new AppError('Mail is already scheduled for this application', 409);
  }

  const selectedResume = resolveResumeTemplatePath(payload.resumeTemplateId);
  console.log('above send mail call ');

  await sendMail({
    to: payload.to,
    subject: payload.subject,
    body: payload.body,
    attachments: [
      {
        filename: selectedResume.filename,
        path: selectedResume.path,
      },
    ],
  });

  await Application.findByIdAndUpdate(application._id, {
    status: 'sent',
    lastEmailSentAt: new Date(),
  });
};
