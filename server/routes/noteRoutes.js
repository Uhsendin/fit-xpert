import express from 'express';
const router = express.Router();
import {
  createNote,
  getUserNotes,
  getNoteById,
  updateNoteById,
  deletedNoteById,
  getUserNotesByDate,
} from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleWare.js';

router.post('/notes', protect, createNote);
router.get('/notes', protect, getUserNotes);
router.get('/notes/:date', protect, getUserNotesByDate);
router
  .route('/notes/:id')
  .get(protect, getNoteById)
  .put(protect, updateNoteById)
  .delete(protect, deletedNoteById);

export default router;
