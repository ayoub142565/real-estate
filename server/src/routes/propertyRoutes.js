import { Router } from 'express';
import {
  createProperty,
  deleteProperty,
  getFeaturedProperties,
  getProperties,
  getProperty,
  updateProperty
} from '../controllers/propertyController.js';
import { authorize, protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import { propertySchema } from '../utils/schemas.js';
import { cacheMiddleware } from '../utils/cache.js';

const router = Router();

router.get('/', cacheMiddleware((req) => `properties:${JSON.stringify(req.query)}`), getProperties);
router.get('/featured', cacheMiddleware(() => 'properties:featured'), getFeaturedProperties);
router.get('/:id', getProperty);
router.post('/', protect, authorize('admin'), upload.array('images', 8), validate(propertySchema), createProperty);
router.put('/:id', protect, authorize('admin'), upload.array('images', 8), updateProperty);
router.delete('/:id', protect, authorize('admin'), deleteProperty);

export default router;
