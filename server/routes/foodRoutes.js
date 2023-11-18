import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleWare.js';
import { createFood, getFoodByDate } from '../controllers/foodController.js';

router.post('/foods', protect, createFood);
router.get('/foods/:date', protect, getFoodByDate);
export default router;
