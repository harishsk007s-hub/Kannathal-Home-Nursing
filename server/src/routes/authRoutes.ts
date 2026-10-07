import { Router } from 'express';
import { loginAdmin, getProfile, changePassword } from '../controllers/authController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', authenticateJwt, getProfile);
router.post('/change-password', authenticateJwt, changePassword);

export default router;
