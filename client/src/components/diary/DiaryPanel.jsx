import { Box, Group, Button, createStyles, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MaterialSymbolsAddNotes } from "../../assets/MaterialSymbolsAddNotes";
import { MdiRun } from "../../assets/MdiRun";
import { TwemojiRedApple } from "../../assets/TwemojiRedApple";
import NoteModelContent from "./note/NoteModelContent";
import React from "react";
import { useSelector } from "react-redux";
import FoodModel from "./food/FoodModel";
import PanelTable from "./PanelTable";
import { selectAllNotes } from "../../slices/notesSlice";
import { selectAllFoods } from "../../slices/foodsSlice";
import ExerciseModel from "./exercise/ExerciseModel";

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border:
      theme.colorScheme === "dark"
        ? "solid 1px rgba(255, 255, 255, 0.1)"
        : "solid 1px rgba(0, 0, 0, 0.03)",

    padding: theme.spacing.sm,
    minHeight: "15rem",
    "@media (min-width: 1200px)": {
      width: "55rem",
    },
    marginTop: theme.spacing.xl,
    marginDown: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
  },
  boxOutline: {
    marginTop: theme.spacing.md,
    minHeight: "15rem",
    padding: theme.spacing.xs,
  },
}));

const handleQuickAdd = (e, type) => {
  console.log(type);
};

const DiaryPanel = () => {
  const [noteOpened, { open: openNote, close: closeNote }] =
    useDisclosure(false);
  const [foodOpened, { open: openFood, close: closeFood }] =
    useDisclosure(false);
  const [exerciseOpened, { open: openExercise, close: closeExercise }] =
    useDisclosure(false);
  const notes = useSelector(selectAllNotes);
  const foods = useSelector(selectAllFoods);
  const joinedArr = [...notes, ...foods];
  const currentDate = useSelector((state) => state.date.selectedDate);
  const date = new Date(currentDate);
  const isToday = date.toDateString() === new Date().toDateString();

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
              onClick={openFood}
              disabled={isToday ? false : true}
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
              onClick={openExercise}
              disabled={isToday ? false : true}
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
              onClick={openNote}
              disabled={isToday ? false : true}
            >
              <MaterialSymbolsAddNotes />
              Note
            </Button>
          </Group>
          <Box className={classes.boxOutline}>
            <PanelTable rowDataArr={joinedArr} />
          </Box>
        </Box>
      </section>
      <NoteModelContent
        opened={noteOpened}
        onClose={closeNote}
        title="Add Note To Diary"
      />
      <FoodModel opened={foodOpened} onClose={closeFood} />
      <ExerciseModel opened={exerciseOpened} onClose={closeExercise} />
    </>
  );
};

export default DiaryPanel;
