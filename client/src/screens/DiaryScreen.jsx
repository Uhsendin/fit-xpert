import React from 'react';
import { MainHeader } from '../components/MainHeader';
import { links } from '../constants/headerLinks';
import { Container } from '@mantine/core';
const DiaryScreen = () => {
  return (
    <>
      <MainHeader links={links} />
      <Container fluid></Container>
    </>
  );
};

export default DiaryScreen;
