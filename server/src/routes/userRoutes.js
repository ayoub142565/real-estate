import { Router } from 'express';
import { adminGetUsers, getFavorites, toggleFavorite } from '../controllers/userController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.get('/favorites', protect, getFavorites);
router.patch('/favorites/:propertyId', protect, toggleFavorite);
router.get('/', protect, authorize('admin'), adminGetUsers);

export default router;
