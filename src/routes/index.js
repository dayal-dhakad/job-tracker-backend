import { Router } from 'express';
import authRoutes from './auth.routes.js';
import applicationRoutes from './application.routes.js';
import mailRoutes from './mail.routes.js';
import resumeTemplateRoutes from './resumeTemplate.routes.js';
const router = Router();
router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
    });
});
router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);
router.use('/mail', mailRoutes);
router.use('/resume-templates', resumeTemplateRoutes);
router.use('/v1/applications', applicationRoutes);
router.use('/v1/emails', mailRoutes);
export default router;
//# sourceMappingURL=index.js.map