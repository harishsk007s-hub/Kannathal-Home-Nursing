import { Router } from 'express';
import {
  getCategories,
  getServices,
  createService,
  updateService,
  deleteService,
  createCategory,
} from '../controllers/serviceController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/', getServices);

// Admin protected routes
router.post('/', authenticateJwt, createService);
router.put('/:id', authenticateJwt, updateService);
router.delete('/:id', authenticateJwt, deleteService);
router.post('/categories', authenticateJwt, createCategory);

export default router;
