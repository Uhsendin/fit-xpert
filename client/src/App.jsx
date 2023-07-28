import React from 'react';
import { MantineProvider } from '@mantine/core';
import HomeScreen from './screens/HomeScreen';
const App = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <HomeScreen />
      </MantineProvider>
    </>
  );
};

export default App;
