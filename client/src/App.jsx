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
        theme={{
          primaryColor: 'blue',
          // colorScheme: 'dark',
          globalStyles: (theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#fffcf6',
            },
          }),
        }}
      >
        <ToastContainer />
        <Outlet />
      </MantineProvider>
    </>
  );
};

export default App;
