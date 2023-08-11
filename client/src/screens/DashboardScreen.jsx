import React from 'react';
import { MainHeader } from '../components/MainHeader';
import { Container, Text } from '@mantine/core';
import { links } from '../constants/headerLinks';
import QuickAddDiary from '../components/dashboard/QuickAddDiary';
const DashboardScreen = () => {
  return (
    <>
      <MainHeader links={links} />
      <Container>
        <Text fz="2rem" mb="md" fw={700}>
          Your Dashboard
        </Text>
        <QuickAddDiary />
      </Container>
    </>
  );
};

export default DashboardScreen;
