import React from 'react';
import { MainHeader } from '../components/MainHeader';
import DailySummary from '../components/dashboard/DailySummary';
import { Container } from '@mantine/core';

const links = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Food', link: '/food' },
  { label: 'Exercise', link: '/exercise' },
];

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
