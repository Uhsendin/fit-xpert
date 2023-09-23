import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const FOOD_BASE_URL = 'https://api.nal.usda.gov/fdc/v1/foods/';

const initialState = {
  foods: [],
  status: 'idle',
  error: null,
};

export const fetchFoodBySearch = createAsyncThunk(
  'food/search',
  async (query) => {
    const encodedQuery = encodeURIComponent(query);
    try {
      const res = await axios.get(
        FOOD_BASE_URL +
        `search?api_key=${import.meta.env.VITE_FOOD_DATA_API_KEY
        }&query=${encodedQuery}`,
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
);

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFoodBySearch.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFoodBySearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.foods = state.foods.concat(action.payload);
      })
      .addCase(fetchFoodBySearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;
