import { Router } from 'express';
import { createInquiry, getInquiries } from '../controllers/inquiryController.js';
import { authorize, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { inquirySchema } from '../utils/schemas.js';

const router = Router();

router.post('/', protect, validate(inquirySchema), createInquiry);
router.get('/', protect, authorize('admin'), getInquiries);

export default router;
