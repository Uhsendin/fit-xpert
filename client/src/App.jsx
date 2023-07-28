import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Outlet />
      </MantineProvider>
    </>
  );
};

export default App;
