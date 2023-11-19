import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import notesReducer from './slices/notesSlice';
import dateReducer from './slices/dateSlice';
import foodReducer from './slices/foodDataBaseSlice';
import foodDataBaseReducer from './slices/foodDataBaseSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    notes: notesReducer,
    date: dateReducer,
    foodDataBase: foodDataBaseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
