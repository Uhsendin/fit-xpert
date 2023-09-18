import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
const NOTES_URL = 'api/notes';

const initialState = {
  notes: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (date) => {
  try {
    const res = await axios.get(NOTES_URL + `/${date}`);
    return [...res.data];
  } catch (err) {
    return err.message;
  }
});

export const addNewNote = createAsyncThunk(
  'notes/addNewNote',
  async (initialNote) => {
    try {
      const res = await axios.post(NOTES_URL, initialNote);
      return res.data;
    } catch (err) {
      return err.response.data.error;
    }
  },
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (initialNote) => {
    const { id } = initialNote;
    try {
      const res = await axios.put(NOTES_URL + `/${id}`, initialNote);
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
);

const notesSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetNotes: (state) => {
      state.notes = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = state.notes.concat(action.payload);
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('update could not complete');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const updatedNotes = state.notes.map((note) =>
          note._id === _id ? action.payload : note,
        );
        state.notes = updatedNotes;
      });
  },
});

export const selectAllNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;
export const selectNoteById = (state, noteId) =>
  state.notes.notes.find((note) => note._id === noteId);
export const { resetNotes } = notesSlice.actions;

export default notesSlice.reducer;
