import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Progress,
  Text,
} from '@mantine/core';
import React from 'react';
import { SummaryStyles } from './SummaryStyle';
const DailySummary = () => {
  const { classes } = SummaryStyles();
  return (
    <div>
      <Box className={classes.boxHeader}>
        <Group position="apart">
          <Text fw={500}>Your Daily Summary</Text>
          <Text fw={500}>0 Day Streak</Text>
        </Group>
      </Box>
      <Box className={classes.boxContent}>
        <Flex
          direction={{ base: 'column', xs: 'row' }}
          gap="md"
          justify="center"
          align="center"
        >
          <Text className={classes.caloireGoal}>2148</Text>
          <Button className={classes.Btn}>Add Exercise</Button>
          <Button className={classes.Btn}>Add Food</Button>
        </Flex>
        <Divider my="sm" />
        <Grid>
          <Grid.Col span={2}>2148</Grid.Col>
          <Grid.Col span={2}>0</Grid.Col>
          <Grid.Col span={2}>-</Grid.Col>
          <Grid.Col span={2}>0</Grid.Col>
          <Grid.Col span={2}>=</Grid.Col>
          <Grid.Col span={2}>0</Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={3}>GOAL</Grid.Col>
          <Grid.Col span={3}>FOOD</Grid.Col>
          <Grid.Col span={3}>EXERCISE</Grid.Col>
          <Grid.Col span={3}>NET</Grid.Col>
        </Grid>
        <Progress className={classes.progress} value={50} striped />
      </Box>
    </div>
  );
};

export default DailySummary;
