import { createStyles } from '@mantine/core';

export const SummaryStyles = createStyles((theme) => ({
  boxHeader: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[3],
    textAlign: 'center',
    padding: theme.spacing.xs,
    borderTopRightRadius: theme.radius.md,
    borderTopLeftRadius: theme.radius.md,
  },
  boxContent: {
    backgroundColor:
      theme.colors === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    padding: theme.spacing.md,
  },

  caloireGoal: {
    fontSize: '3rem',
    fontWeight: 'bold',
    lineHeight: '1',
  },
  Btn: {
    minWidth: '9rem',
  },

  progress: {
    marginTop: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
}));
