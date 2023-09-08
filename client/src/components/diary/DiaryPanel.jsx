import { Box, Group, Button, createStyles, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MaterialSymbolsAddNotes } from '../../assets/MaterialSymbolsAddNotes';
import { MdiRun } from '../../assets/MdiRun';
import { TwemojiRedApple } from '../../assets/TwemojiRedApple';
import NoteModelContent from './NoteModelContent';
import React from 'react';
import TableDiary from './TableDiary';

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
    maxWidth: '60rem',
    marginTop: theme.spacing.xl,
    marginDown: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
  },
  boxOutline: {
    marginTop: theme.spacing.md,
    minHeight: '15rem',
    padding: theme.spacing.xs,
  },
}));

const handleQuickAdd = (e, type) => {
  console.log(type);
};

const DiaryPanel = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { classes } = useStyles();
  return (
    <>
      <section>
        <Box className={classes.box}>
          <Group spacing="xs">
            <Button
              variant="light"
              color="colorScheme"
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
              variant="light"
              color="colorScheme"
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
              variant="light"
              color="colorScheme"
              radius="md"
              size="md"
              uppercase
              compact
              onClick={open}
            >
              <MaterialSymbolsAddNotes />
              Note
            </Button>
          </Group>
          <Box className={classes.boxOutline}>
            <TableDiary />
            {/* <Text fw={500}> */}
            {/* Add food, exercise, or notes to display them in your diary. */}
            {/* </Text> */}
          </Box>
        </Box>
      </section>
      <NoteModelContent
        opened={opened}
        onClose={close}
        title="Add Note To Diary"
      />
    </>
  );
};

export default DiaryPanel;
