import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
const FOOD_URL = 'api/foods';

const initialState = {
  userFoods: [],
  userFoodStatus: 'idle', // 'idle' | 'loading' 'succeeded' | 'failed'
  error: null,
};

export const fetchFoodsByDate = createAsyncThunk(
  'foods/fetchFoods',
  async (date) => {
    try {
      const res = await axios.get(FOOD_URL + `/${date}`);
      return [...res.data];
    } catch (err) {
      return err.response.data.error;
    }
  },
);

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

export const updateFood = createAsyncThunk(
  'foods/updateFood',
  async ({ id, initialFood }) => {
    try {
      const res = await axios.put(FOOD_URL + `/${id}`, initialFood);
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
);

export const deleteFood = createAsyncThunk(
  'foods/deleteFood',
  async (initialFood) => {
    const { id } = initialFood;
    try {
      const res = await axios.delete(FOOD_URL + `/${id}`);
      return { _id: id };
    } catch (err) {
      return err.message;
    }
  },
);

const foodsSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    resetFoods: (state) => {
      state.userFoods = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFoodsByDate.pending, (state, action) => {
        state.userFoodStatus = 'loading';
      })
      .addCase(fetchFoodsByDate.fulfilled, (state, action) => {
        state.userFoodStatus = 'succeeded';
        state.userFoods = action.payload;
      })
      .addCase(fetchFoodsByDate.rejected, (state, action) => {
        state.userFoodStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewFood.fulfilled, (state, action) => {
        state.userFoods.push(action.payload);
      })
      .addCase(updateFood.pending, (state) => {
        state.userFoodStatus = 'loading';
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.userFoodStatus = 'succeeded';
        state.userFoods = state.userFoods.map((food) =>
          food._id === action.payload._id ? action.payload : food,
        );
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.userFoodStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        if (!action.payload._id) {
          state.userFoodStatus = 'failed';
          state.error = action.error.message;
          toast.error('(Error 404: Food not found) Try again!');
          return;
        }
        state.userFoods = state.userFoods.filter(
          (food) => food._id !== action.payload._id,
        );
      });
  },
});

export const selectFoodById = (state, foodId) =>
  state.foods.userFoods.find((food) => food._id === foodId);
export const selectAllFoods = (state) => state.foods.userFoods;
export const getFoodsStatus = (state) => state.foods.userFoodStatus;
export const getFoodsError = (state) => state.foods.error;
export default foodsSlice.reducer;
