import {
  Checkbox,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  createStyles,
} from '@mantine/core';
import React, { useState } from 'react';
import FoodRingLog from './FoodRingLog';

const useStyles = createStyles((theme) => ({
  text: {
    textAlign: 'center',
  },
  numInput: {
    maxWidth: '3rem',
  },
  serving: {
    height: '100%',
    width: '100%',
  },
}));

const FoodSummaryPanel = ({ foodId }) => {
  const { classes } = useStyles();
  const [servingNum, setServingNum] = useState(1);
  const { description } = foodId;
  const dummyArr = [
    { value: '1g', label: 'g' },
    { value: '4g', label: 'tsp, chopped - 4g' },
    { value: '8g', label: 'grape - 8g' },
  ];

  return (
    <>
      <Text className={classes.text}>{description}</Text>
      <Grid grow gutter="xs">
        <Grid.Col span={6}>
          <FoodRingLog foodById={foodId} />
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
