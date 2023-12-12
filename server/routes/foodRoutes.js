import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleWare.js';
import {
  createFood,
  getFoodByDate,
  updateFoodById,
} from '../controllers/foodController.js';

router.post('/foods', protect, createFood);
router.get('/foods/:date', protect, getFoodByDate);
router.put('/foods/:id', protect, updateFoodById);
export default router;
