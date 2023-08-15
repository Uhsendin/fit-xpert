import express from 'express';
const router = express.Router();
import { createNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleWare.js';

router.post('/notes', protect, createNote);
export default router;
