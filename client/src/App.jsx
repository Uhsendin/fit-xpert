import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ primaryColor: 'pink' }}
      >
        <Outlet />
      </MantineProvider>
    </>
  );
};

export default App;
