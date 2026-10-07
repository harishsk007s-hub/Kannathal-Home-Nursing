import { Router } from 'express';
import {
  getApprovedFeedbacks,
  getAllFeedbacks,
  createFeedback,
  toggleApproveFeedback,
  deleteFeedback,
} from '../controllers/feedbackController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getApprovedFeedbacks);
router.post('/', createFeedback);

// Admin protected routes
router.get('/all', authenticateJwt, getAllFeedbacks);
router.patch('/:id/approve', authenticateJwt, toggleApproveFeedback);
router.delete('/:id', authenticateJwt, deleteFeedback);

export default router;
