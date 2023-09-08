import React from 'react';
import { MainHeader } from '../components/MainHeader';
import { links } from '../constants/headerLinks';
import { Container, Flex } from '@mantine/core';
import Pagination from '../components/diary/Pagination';
import DiaryPanel from '../components/diary/DiaryPanel';
const DiaryScreen = () => {
  return (
    <>
      <MainHeader links={links} />
      <Container fluid>
        <main>
          <Flex
            direction={{ base: 'column', lg: 'row-reverse' }}
            gap={{ base: '0', lg: 'md' }}
            justify={{ lg: 'center' }}
          >
            <Pagination />
            <DiaryPanel />
          </Flex>
        </main>
      </Container>
    </>
  );
};

export default DiaryScreen;
