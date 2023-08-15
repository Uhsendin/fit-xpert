import asyncHandler from 'express-async-handler';
import Note from '../models/noteModel.js';

// Desc     Create a new note
// route    POST /api/notes
// access   Private
const createNote = asyncHandler(async (req, res) => {
  const { content, tags } = req.body;

  const note = new Note({
    content,
    tags,
  });

  try {
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    res.status(400).json({ err: 'Provide content for your note' });
  }
});

export { createNote };
