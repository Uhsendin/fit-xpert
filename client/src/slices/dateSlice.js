import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    selectedDate: new Date().getTime(),
  },
  reducers: {
    updateDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    incrementDate: (state) => {
      state.selectedDate += 24 * 60 * 60 * 1000;
    },
    decrementDate: (state) => {
      state.selectedDate -= 24 * 60 * 60 * 1000;
    },
  },
});

export const { updateDate, incrementDate, decrementDate } = dateSlice.actions;
export default dateSlice.reducer;
