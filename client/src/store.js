import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import notesReducer from './slices/notesSlice';
import dateReducer from './slices/dateSlice';
import foodDataBaseReducer from './slices/foodDataBaseSlice';
import foodsReducer from './slices/foodsSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    notes: notesReducer,
    date: dateReducer,
    foodDataBase: foodDataBaseReducer,
    foods: foodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
