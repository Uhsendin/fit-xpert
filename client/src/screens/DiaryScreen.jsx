import React from 'react';
import { MainHeader } from '../components/MainHeader';
import { links } from '../constants/headerLinks';
import { Container } from '@mantine/core';
import Pagination from '../components/diary/Pagination';
import DiaryPanel from '../components/diary/DiaryPanel';
const DiaryScreen = () => {
  return (
    <>
      <MainHeader links={links} />
      <Container fluid>
        <main>
          <Pagination />
          <DiaryPanel />
        </main>
      </Container>
    </>
  );
};

export default DiaryScreen;
