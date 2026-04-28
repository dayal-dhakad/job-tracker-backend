import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Application } from '../models/application.model.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createApplication = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new AppError('Unauthorized', 401);
  }

  const {
    companyName,
    jobTitle,
    recruiterName,
    recruiterEmail,
    source,
    workMode,
    notes,
    subject,
    emailBody,
    resume,
    template,
    status,
    applicationType,
  } = req.body as {
    companyName?: string;
    jobTitle?: string;
    recruiterName?: string;
    recruiterEmail?: string;
    source?: string;
    workMode?: string;
    notes?: string;
    subject?: string;
    emailBody?: string;
    resume?: string;
    template?: string;
    status?: string;
    applicationType?: string;
  };

  if (!companyName?.trim()) {
    throw new AppError('Company name is required', 400);
  }

  if (!jobTitle?.trim()) {
    throw new AppError('Job title is required', 400);
  }

  const applicationPayload = {
    user: req.user.userId,
    companyName: companyName.trim(),
    jobTitle: jobTitle.trim(),
    source: source || 'other',
    workMode: workMode || 'unknown',
    status: status || 'draft',
    applicationType: applicationType || 'cold-email',
    ...(recruiterName?.trim() ? { recruiterName: recruiterName.trim() } : {}),
    ...(recruiterEmail?.trim() ? { recruiterEmail: recruiterEmail.trim() } : {}),
    ...(notes?.trim() ? { notes: notes.trim() } : {}),
    ...(subject?.trim() ? { subject: subject.trim() } : {}),
    ...(emailBody?.trim() ? { emailBody: emailBody.trim() } : {}),
  };

  const application = await Application.create({
    ...applicationPayload,
    ...(resume && mongoose.Types.ObjectId.isValid(resume) ? { resume } : {}),
    ...(template && mongoose.Types.ObjectId.isValid(template) ? { template } : {}),
  });

  res.status(201).json({
    success: true,
    message: 'Application created successfully',
    data: {
      id: application._id.toString(),
      companyName: application.companyName,
      jobTitle: application.jobTitle,
      status: application.status,
    },
  });
});

export const getApplications = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new AppError('Unauthorized', 401);
  }

  const applications = await Application.find({ user: req.user.userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: 'Applications fetched successfully',
    data: applications,
  });
});

export const getApplicationById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new AppError('Unauthorized', 401);
  }

  const applicationIdParam = req.params.applicationId;
  const applicationId = Array.isArray(applicationIdParam)
    ? applicationIdParam[0]
    : applicationIdParam;

  if (!applicationId || !mongoose.Types.ObjectId.isValid(applicationId)) {
    throw new AppError('Valid application id is required', 400);
  }

  const application = await Application.findOne({
    _id: applicationId,
    user: req.user.userId,
  });

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Application fetched successfully',
    data: application,
  });
});
