import { Router } from 'express';
import { createApplication, getApplications } from '../controllers/application.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = Router();
router.get('/', protect, getApplications);
router.post('/', protect, createApplication);
export default router;
//# sourceMappingURL=application.routes.js.map