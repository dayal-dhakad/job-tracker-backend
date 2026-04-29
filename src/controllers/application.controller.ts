import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Application } from '../models/application.model.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const applicationStatuses = [
  'draft',
  'ready',
  'sent',
  'replied',
  'interview',
  'rejected',
  'offer',
  'closed',
] as const;

const applicationSources = [
  'linkedin',
  'naukri',
  'instahyre',
  'foundit',
  'company-website',
  'referral',
  'other',
] as const;

const workModes = ['remote', 'hybrid', 'onsite', 'unknown'] as const;

const applicationTypes = [
  'cold-email',
  'direct-apply',
  'referral-request',
  'recruiter-outreach',
] as const;

const isOneOf = <T extends readonly string[]>(value: string, options: T): value is T[number] =>
  options.includes(value as T[number]);

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
    resumeTemplateId,
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
    resumeTemplateId?: string;
    template?: string;
    status?: string;
    applicationType?: string;
  };

  const normalizedStatus = status?.trim() || 'draft';
  const normalizedSource = source?.trim() || 'other';
  const normalizedWorkMode = workMode?.trim() || 'unknown';
  const normalizedApplicationType = applicationType?.trim() || 'cold-email';

  if (!isOneOf(normalizedStatus, applicationStatuses)) {
    throw new AppError('Valid application status is required', 400);
  }

  if (!isOneOf(normalizedSource, applicationSources)) {
    throw new AppError('Valid application source is required', 400);
  }

  if (!isOneOf(normalizedWorkMode, workModes)) {
    throw new AppError('Valid work mode is required', 400);
  }

  if (!isOneOf(normalizedApplicationType, applicationTypes)) {
    throw new AppError('Valid application type is required', 400);
  }

  if (!companyName?.trim()) {
    throw new AppError('Company name is required', 400);
  }

  if (!jobTitle?.trim()) {
    throw new AppError('Job title is required', 400);
  }

  if (normalizedStatus !== 'draft') {
    if (!recruiterEmail?.trim()) {
      throw new AppError('Recruiter email is required before sending or scheduling', 400);
    }

    if (!subject?.trim()) {
      throw new AppError('Subject is required before sending or scheduling', 400);
    }

    if (!emailBody?.trim()) {
      throw new AppError('Email body is required before sending or scheduling', 400);
    }
  }

  const applicationPayload = {
    user: req.user.userId,
    companyName: companyName.trim(),
    jobTitle: jobTitle.trim(),
    source: normalizedSource,
    workMode: normalizedWorkMode,
    status: normalizedStatus,
    applicationType: normalizedApplicationType,
    ...(recruiterName?.trim() ? { recruiterName: recruiterName.trim() } : {}),
    ...(recruiterEmail?.trim() ? { recruiterEmail: recruiterEmail.trim() } : {}),
    ...(notes?.trim() ? { notes: notes.trim() } : {}),
    ...(subject?.trim() ? { subject: subject.trim() } : {}),
    ...(emailBody?.trim() ? { emailBody: emailBody.trim() } : {}),
    ...(resumeTemplateId?.trim() ? { resumeTemplateId: resumeTemplateId.trim() } : {}),
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
