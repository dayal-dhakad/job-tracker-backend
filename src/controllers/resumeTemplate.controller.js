import { asyncHandler } from '../utils/asyncHandler.js';
import { listResumeTemplates } from '../utils/resumeTemplate.utils.js';
export const getResumeTemplates = asyncHandler(async (_req, res) => {
    res.status(200).json(listResumeTemplates());
});
//# sourceMappingURL=resumeTemplate.controller.js.map