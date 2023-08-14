import { Box, Group, Button, createStyles, Text } from '@mantine/core';
import { MaterialSymbolsAddNotes } from '../../assets/MaterialSymbolsAddNotes';
import { MdiRun } from '../../assets/MdiRun';
import { TwemojiRedApple } from '../../assets/TwemojiRedApple';
import React from 'react';

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border:
      theme.colorScheme === 'dark'
        ? 'solid 1px rgba(255, 255, 255, 0.1)'
        : 'solid 1px rgba(0, 0, 0, 0.03)',

    padding: theme.spacing.sm,
    minHeight: '15rem',
    marginTop: theme.spacing.xl,
    marginDown: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
  },
  boxOutline: {
    marginTop: theme.spacing.md,
    minHeight: '15rem',
    border:
      theme.colorScheme === 'dark'
        ? 'solid 1px rgba(255, 255, 255, 0.1)'
        : 'solid 1px rgba(0, 0, 0, .1)',
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
  },
}));

const DiaryPanel = () => {
  const { classes } = useStyles();
  return (
    <>
      <section>
        <Box className={classes.box}>
          <Group spacing="xs">
            <Button
              variant="subtle"
              color="dark"
              radius="md"
              size="md"
              uppercase
              compact
              onClick={(e) => handleQuickAdd(e, 'Food')}
            >
              <TwemojiRedApple />
              Food
            </Button>
            <Button
              variant="subtle"
              color="dark"
              radius="md"
              size="md"
              uppercase
              compact
              onClick={(e) => handleQuickAdd(e, 'Exercise')}
            >
              <MdiRun />
              Exercise
            </Button>
            <Button
              variant="subtle"
              color="dark"
              radius="md"
              size="md"
              uppercase
              compact
              onClick={(e) => handleQuickAdd(e, 'Note')}
            >
              <MaterialSymbolsAddNotes />
              Note
            </Button>
          </Group>
          <Box className={classes.boxOutline}>
            <Text fw={500}>
              Add food, exercise, or notes to display them in your diary.
            </Text>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default DiaryPanel;
