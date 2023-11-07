import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleWare.js';
import { createFood } from '../controllers/foodController.js';

router.post('/foods', protect, createFood);
export default router;
