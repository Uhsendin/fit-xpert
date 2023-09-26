import {
  Anchor,
  Flex,
  Paper,
  RingProgress,
  Stack,
  Text,
  createStyles,
} from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  text: {
    textAlign: 'center',
  },
  stack: {
    padding: '.5rem 0 0 0',
  },
  cicle: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  protein: {
    background: '#44d07b',
  },
  fat: {
    background: '#ea3b07',
  },
  carbs: {
    background: '#1ccad7',
  },
  proteinText: {
    color: '#44d07b',
    fontWeight: '700',
  },
  fatText: {
    color: '#ea3b07',
    fontWeight: '700',
  },
  carbsText: {
    color: '#1ccad7',
    fontWeight: '700',
  },
}));

const dummyVals = [
  { value: 40, color: '#1ccad7' },
  { value: 25, color: '#44d07b' },
  { value: 15, color: '#ea3b07' },
];
const FoodSummaryPanel = () => {
  const { classes } = useStyles();
  return (
    <>
      <Text className={classes.text}>Food Desc</Text>
      <Flex>
        <Paper shadow="xs" p="sm" withBorder>
          <Flex>
            <RingProgress
              sections={dummyVals}
              size={115}
              thickness={10}
              label={
                <>
                  <Text fw={500} className={classes.text}>
                    150
                  </Text>
                  <Text c="dimmed" className={classes.text}>
                    kcal
                  </Text>
                </>
              }
            />
            <Stack spacing="xs" className={classes.stack}>
              <Flex align="center">
                <div className={`${classes.cicle} ${classes.protein}`}></div>
                <Text>
                  Protein: 0.1g (
                  <span className={classes.proteinText}>12.9%</span>)
                </Text>
              </Flex>
              <Flex align="center">
                <div className={`${classes.cicle} ${classes.carbs}`}></div>
                <Text>
                  Net Carbs: 0.5g (
                  <span className={classes.carbsText}>77.4%</span>)
                </Text>
              </Flex>
              <Flex align="">
                <div className={`${classes.cicle} ${classes.fat}`}></div>
                <Text>
                  Fat: 0.0g (<span className={classes.fatText}>9.7%</span>)
                </Text>
              </Flex>
            </Stack>
          </Flex>
        </Paper>
      </Flex>
      <Text>
        Data Source:{' '}
        <Anchor
          href="https://fdc.nal.usda.gov/index.html"
          target="_blank"
          color="dimmed"
        >
          USDA
        </Anchor>
      </Text>
    </>
  );
};

export default FoodSummaryPanel;
