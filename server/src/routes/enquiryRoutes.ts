import { Router } from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

// Public route to submit enquiry
router.post('/', createEnquiry);

// Admin protected routes
router.get('/', authenticateJwt, getAllEnquiries);
router.patch('/:id', authenticateJwt, updateEnquiryStatus);
router.delete('/:id', authenticateJwt, deleteEnquiry);

export default router;
