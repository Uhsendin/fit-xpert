import {
  Anchor,
  Checkbox,
  Flex,
  Grid,
  Group,
  NumberInput,
  Paper,
  RingProgress,
  Select,
  Stack,
  Text,
  createStyles,
} from '@mantine/core';
import React, { useState } from 'react';

const useStyles = createStyles((theme) => ({
  text: {
    textAlign: 'center',
  },
  stack: {
    padding: '.5rem 0 0 0',
  },
  numInput: {
    maxWidth: '3rem',
  },
  serving: {
    height: '100%',
    width: '100%',
  },
  test: {
    display: 'none',
  },
  circle: {
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

const FoodRingLog = () => {
  const { classes } = useStyles();
  return (
    <>
      <section>
        <Flex>
          <Paper shadow="xs" p="sm" withBorder className={classes.serving}>
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
                  <div className={`${classes.circle} ${classes.protein}`}></div>
                  <Text>
                    Protein: 0.1g (
                    <span className={classes.proteinText}>12.9%</span>)
                  </Text>
                </Flex>
                <Flex align="center">
                  <div className={`${classes.circle} ${classes.carbs}`}></div>
                  <Text>
                    Net Carbs: 0.5g (
                    <span className={classes.carbsText}>77.4%</span>)
                  </Text>
                </Flex>
                <Flex align="center">
                  <div className={`${classes.circle} ${classes.fat}`}></div>
                  <Text>
                    Fat: 0.0g (<span className={classes.fatText}>9.7%</span>)
                  </Text>
                </Flex>
              </Stack>
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
          </Paper>
        </Flex>
      </section>
    </>
  );
};
const FoodSummaryPanel = () => {
  const { classes } = useStyles();
  const [servingNum, setServingNum] = useState(1);

  const dummyArr = [
    { value: '1g', label: 'g' },
    { value: '4g', label: 'tsp, chopped - 4g' },
    { value: '8g', label: 'grape - 8g' },
  ];

  return (
    <>
      <Text className={classes.text}>Food Desc</Text>
      <Grid grow gutter="xs">
        <Grid.Col span={6}>
          <FoodRingLog />
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper shadow="xs" p="sm" withBorder className={classes.serving}>
            <Stack spacing="xl" justify="space-evenly">
              <Group>
                <Text fz="lg">Time of day</Text>
                <Checkbox size="md" />
              </Group>
              <Group>
                <Text fz="lg">Serving Size</Text>
                <NumberInput
                  className={classes.numInput}
                  type="number"
                  hideControls
                  aria-label="Serving size"
                  value={servingNum}
                />
                <Select defaultValue="1g" data={dummyArr} />
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default FoodSummaryPanel;
