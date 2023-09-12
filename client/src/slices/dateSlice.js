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
  },
});

export const { updateDate } = dateSlice.actions;
export default dateSlice.reducer;
