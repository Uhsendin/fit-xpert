import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const FOOD_URL = 'api/foods';

const initialState = {
  userFoods: [],
  userFoodStatus: 'idle', // 'idle' | 'loading' 'succeeded' | 'failed'
  error: null,
};

export const addNewFood = createAsyncThunk(
  'foods/addNewFood',
  async (foodObjectInfo) => {
    try {
      const res = await axios.post(FOOD_URL, foodObjectInfo);
      return res.data;
    } catch (err) {
      return err.response.data.error;
    }
  },
);

const foodsSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addNewFood.fulfilled, (state, action) => {
      state.userFoods.push(action.payload);
    });
  },
});

export default foodsSlice.reducer;
