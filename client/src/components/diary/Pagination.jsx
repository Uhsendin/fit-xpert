import { Box, Group, createStyles } from '@mantine/core';
import React from 'react';
import Arrow from '../../assets/Arrow';
import CalendarToday from '../../assets/CalendarToday';
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

const handleClicks = (e, type) => {
  console.log(type);
};
const Pagination = () => {
  const { classes } = useStyles();
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
            <Group
              onClick={(event) => handleClicks(event, 'Calendar')}
              className={classes.calendar}
            >
              <CalendarToday />
              <span className={classes.date}>Today</span>
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
    </>
  );
};

export default Pagination;
