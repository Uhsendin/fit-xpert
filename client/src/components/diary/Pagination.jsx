import { Box, Group, createStyles, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import Arrow from '../../assets/Arrow';
import CalendarToday from '../../assets/CalendarToday';
import Calendar from './note/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { incrementDate, decrementDate } from '../../slices/dateSlice';

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border:
      theme.colorScheme === 'dark'
        ? 'solid 1px rgba(255, 255, 255, 0.1)'
        : 'solid 1px rgba(0, 0, 0, 0.03)',
    maxWidth: '25rem',
    padding: theme.spacing.sm,
    marginTop: theme.spacing.xl,
    marginDown: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
  },
  date: {
    fontWeight: 'bolder',
    fontSize: theme.fontSizes.xl,
  },
  calendar: {
    cursor: 'pointer',
    padding: '.5rem 1rem',
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },
  arrow: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '.5rem .1rem',
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },
}));

const Pagination = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.date.selectedDate);
  const date = new Date(currentDate);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const isToday = date.toDateString() === new Date().toDateString();

  const formattedDate = isToday ? 'Today' : `${month} ${day}`;

  const handleClicks = (e, type) => {
    if (type === 'Back') {
      dispatch(decrementDate());
    } else {
      dispatch(incrementDate());
    }
  };

  return (
    <>
      <section>
        <Box className={classes.box}>
          <Group>
            <span
              onClick={(event) => handleClicks(event, 'Back')}
              className={classes.arrow}
            >
              <Arrow />
            </span>
            <Group onClick={open} className={classes.calendar}>
              <CalendarToday />
              <span className={classes.date}>{formattedDate}</span>
            </Group>
            <span
              onClick={(event) => handleClicks(event, 'Forward')}
              className={classes.arrow}
            >
              <Arrow style={{ transform: 'rotate(180deg)' }} />
            </span>
          </Group>
        </Box>
      </section>
      <Modal opened={opened} onClose={close}>
        <Calendar></Calendar>
      </Modal>
    </>
  );
};

export default Pagination;
