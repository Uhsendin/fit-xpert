import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ primaryColor: 'pink' }}
      >
        <ToastContainer />
        <Outlet />
      </MantineProvider>
    </>
  );
};

export default App;
