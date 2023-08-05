import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen.jsx';
import { AuthenticationForm } from './screens/AuthenticationScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import FoodScreen from './screens/FoodScreen.jsx';
import ExerciseScreen from './screens/ExerciseScreen.jsx';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index="true" path="/" element={<HomeScreen />} />
      <Route path="authentication" element={<AuthenticationForm />} />
      <Route path="dashboard" element={<DashboardScreen />} />
      <Route path="food" element={<FoodScreen />} />
      <Route path="exercise" element={<ExerciseScreen />} />
      <Route path="settings/profile" element={<ProfileSettingsScreen />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
);
