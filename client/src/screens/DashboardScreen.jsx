import React from 'react';
import { MainHeader } from '../components/MainHeader';
import DailySummary from '../components/dashboard/DailySummary';
import { Container } from '@mantine/core';
import { links } from '../constants/headerLinks';
const DashboardScreen = () => {
  return (
    <>
      <MainHeader links={links} />
      <Container>
        <DailySummary />
      </Container>
    </>
  );
};

export default DashboardScreen;
