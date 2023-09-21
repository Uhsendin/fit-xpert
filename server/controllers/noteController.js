import asyncHandler from 'express-async-handler';
import Note from '../models/noteModel.js';

// Desc     Create a new note
// route    POST /api/notes
// access   Private
const createNote = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { content, tags } = req.body;

  if (!content) {
    res.status(400).json({ error: 'Content is required for your note' });
    return;
  }

  const note = new Note({
    user: userId,
    content,
    tags,
  });

  const savedNote = await note.save();
  res.json(savedNote);
});

// Desc   Get all notes
// route  GET /api/notes
// access Private
const getUserNotes = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const notes = await Note.find({ user: userId });

  res.json(notes);
});

// Desc Get all notes based on date range
// route GET /api/notes:date
// acces Private
const getUserNotesByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;
  const userId = req.user._id;
  const selectedDate = new Date(Number(date));

  const day = selectedDate.getDate().toString().padStart(2, '0');
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = selectedDate.getFullYear();

  let notes = await Note.find({
    createdAt: {
      $gte: new Date(`${year}-${month}-${day}T00:00:00.000Z`),
      $lt: new Date(`${year}-${month}-${day}T23:59:59.999Z`),
    },
    user: userId,
  });

  if (notes === null) {
    res.status(404);
    throw new Error('Notes not found');
  }
  res.json(notes);
});

// Desc   Get single note
// route  GET /api/notes:id
// access Private
const getNoteById = asyncHandler(async (req, res) => {
  const userId = req.user._id; // User ID from the JWT payload
  const noteId = req.params.id; // Note ID from the URL parameter

  const note = await Note.findOne({ _id: noteId, user: userId });

  if (note === null) {
    res.status(404);
    throw new Error('Note not found');
  }
  res.json(note);
});

// Desc   Update single note
// route  PUT /api/notes:id
// access Private
const updateNoteById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const noteId = req.params.id;
  const { content, tags } = req.body;
  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    { content, tags },
    { new: true },
  );

  if (updatedNote === null) {
    res.status(404);
    throw new Error('Note not found');
  }

  res.json(updatedNote);
});

// Desc   Delete single note
// route  DELETE /api/notes:id
// access Private
const deletedNoteById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const noteId = req.params.id;

  const deleteNote = await Note.findOneAndDelete({ _id: noteId, user: userId });

  if (deleteNote === null) {
    res.status(404);
    throw new Error('Note not found');
  }

  res.status(204).end();
});

export {
  createNote,
  getUserNotes,
  getUserNotesByDate,
  getNoteById,
  updateNoteById,
  deletedNoteById,
};
