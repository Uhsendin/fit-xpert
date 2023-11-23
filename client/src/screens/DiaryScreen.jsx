import React, { useEffect, useRef, useState } from 'react';
import { MainHeader } from '../components/MainHeader';
import { links } from '../constants/headerLinks';
import { Container, Flex } from '@mantine/core';
import Pagination from '../components/diary/Pagination';
import DiaryPanel from '../components/diary/DiaryPanel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, getNotesStatus, resetNotes } from '../slices/notesSlice';
import { fetchFoodsByDate } from '../slices/foodsSlice';

const DiaryScreen = () => {
  const isRan = useRef(false);
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.date.selectedDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const notesStatus = useSelector(getNotesStatus);
  useEffect(() => {
    if (!isRan.current && notesStatus === 'idle') {
      dispatch(fetchNotes(currentDate));
      dispatch(fetchFoodsByDate(currentDate));
    }
    if (selectedDate !== currentDate) {
      dispatch(resetNotes());
      dispatch(fetchNotes(currentDate));
      dispatch(fetchFoodsByDate(currentDate));
      setSelectedDate(currentDate);
    }

    return () => (isRan.current = true);
  }, [currentDate]);
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
