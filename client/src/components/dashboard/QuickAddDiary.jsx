import { Box, Flex, Text, createStyles } from '@mantine/core';
const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xl,
    marginDown: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
  },
  quickAdd: {
    backgroundColor: theme.colorScheme === 'dark' ? '#1A1B1E' : '#fff',
    borderRadius: theme.radius.md,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[2],
      cursor: 'pointer',
      borderRadius: theme.radius.md,
    },
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
          <Text
            onClick={(e) => handleQuickAdd(e, 'Food')}
            className={classes.quickAdd}
            p="xs"
            fw={500}
            align="center"
          >
            FOOD
          </Text>
          <Text
            onClick={(e) => handleQuickAdd(e, 'Exercise')}
            className={classes.quickAdd}
            p="xs"
            fw={500}
          >
            EXERCISE
          </Text>
          <Text
            onClick={(e) => handleQuickAdd(e, 'Note')}
            className={classes.quickAdd}
            p="xs"
            fw={500}
          >
            NOTE
          </Text>
        </Flex>
      </Box>
    </div>
  );
};

export default QuickAddDiary;
