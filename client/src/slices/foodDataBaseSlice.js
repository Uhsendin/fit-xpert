import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const FOOD_BASE_URL_SEARCH = 'https://api.nal.usda.gov/fdc/v1/foods/';
const FOOD_BASE_URL_ID = 'https://api.nal.usda.gov/fdc/v1/food/';

const initialState = {
  foodsSearchList: [],
  currentFood: [],
  searchStatus: 'idle',
  currentFoodStatus: 'idle',
  error: null,
};

export const fetchFoodBySearch = createAsyncThunk(
  'foodDataBase/search',
  async (query) => {
    const encodedQuery = encodeURIComponent(query);
    try {
      const res = await axios.get(
        FOOD_BASE_URL_SEARCH +
        `search?&query=${encodedQuery}&dataType=Branded,Foundation,Survey (FNDDS),SR Legacy&pageSize=50&pageNumber=1&requireAllWords=true
&sortOrder=asc&api_key=${import.meta.env.VITE_FOOD_DATA_API_KEY}`,
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
);

export const fetchFoodById = createAsyncThunk(
  'foodDataBase/id',
  async (query) => {
    try {
      const res = await axios.get(
        FOOD_BASE_URL_ID +
        query +
        '?nutrients=203&nutrients=204&nutrients=205&nutrients=208' +
        `&api_key=${import.meta.env.VITE_FOOD_DATA_API_KEY}`,
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
);

const foodDataBaseSlice = createSlice({
  name: 'foodDataBase',
  initialState,
  reducers: {
    clearFoodsSearchList: (state) => {
      state.foodsSearchList = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFoodBySearch.pending, (state, action) => {
        state.searchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchFoodBySearch.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.foodsSearchList = action.payload;
      })
      .addCase(fetchFoodBySearch.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFoodById.pending, (state, action) => {
        state.currentFoodStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        state.currentFoodStatus = 'succeeded';
        state.currentFood = action.payload;
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        state.currentFoodStatus = 'failed';
        state.error = action.error.message;
      });
  },
});
export const selectFoodById = (state, foodId) => {
  if (state.foodDataBase.foodsSearchList.foods) {
    return state.foodDataBase.foodsSearchList.foods.find(
      (food) => food.fdcId === foodId,
    );
  } else return null;
};
export const selectAllFoods = (state) => state.foodDataBase.userFoods;
export const { clearFoodsSearchList } = foodDataBaseSlice.actions;

export default foodDataBaseSlice.reducer;
