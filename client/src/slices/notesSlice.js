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

const notesSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
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
      });
  },
});

export const selectAllNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;

export default notesSlice.reducer;
