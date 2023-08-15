import express from 'express';
const router = express.Router();
import { createNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleWare.js';

router.post('/notes', protect, createNote);
// router.get('/notes');
// router.get('/notes/:id');
// router.route('/notes/:id').put(protect, ).delete(protect, );

export default router;
