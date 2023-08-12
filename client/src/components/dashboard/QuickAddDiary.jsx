import { Box, Flex, Text, Button, createStyles } from '@mantine/core';
const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border:
      theme.colorScheme === 'dark'
        ? 'solid 1px rgba(255, 255, 255, 0.1)'
        : 'solid 1px rgba(0, 0, 0, 0.03)',

    padding: theme.spacing.sm,
    marginTop: theme.spacing.xl,
    marginDown: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
  },
}));

const QuickAddDiary = () => {
  const { classes } = useStyles();

  const handleQuickAdd = (event, type) => {
    console.log(type);
  };
  return (
    <div>
      <Box className={classes.box}>
        <Flex
          direction={{ base: 'column', xs: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify="space-between"
          align="center"
        >
          <Text fz="lg" p="xs" fw={700}>
            Quick Add to Diary
          </Text>
          <Button
            variant="subtle"
            color="colorScheme"
            radius="md"
            size="md"
            uppercase
            onClick={(e) => handleQuickAdd(e, 'Food')}
          >
            Food
          </Button>
          <Button
            variant="subtle"
            color="colorScheme"
            radius="md"
            size="md"
            uppercase
            onClick={(e) => handleQuickAdd(e, 'Exercise')}
          >
            Exercise
          </Button>
          <Button
            variant="subtle"
            color="colorScheme"
            radius="md"
            size="md"
            uppercase
            onClick={(e) => handleQuickAdd(e, 'Note')}
          >
            Note
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default QuickAddDiary;
