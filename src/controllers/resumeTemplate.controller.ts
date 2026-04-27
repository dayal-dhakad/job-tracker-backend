import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { listResumeTemplates } from '../utils/resumeTemplate.utils.js';

export const getResumeTemplates = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json(listResumeTemplates());
});
