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
  serving: {
    height: '100%',
    width: '100%',
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

const FoodRingLog = ({ food }) => {
  const { classes } = useStyles();
  const protein = food.foodNutrients.find(
    (nutrient) => nutrient.nutrientNumber === '203',
  );
  const carbs = food.foodNutrients.find(
    (nutrient) => nutrient.nutrientNumber === '205',
  );
  const fat = food.foodNutrients.find(
    (nutrient) => nutrient.nutrientNumber === '204',
  );
  const kcal = food.foodNutrients.find((nutrient) =>
    ['208', '957'].includes(nutrient.nutrientNumber),
  );

  const total = protein.value + carbs.value + fat.value;

  const proteinPercentage = (protein.value / total) * 100;
  const carbsPercentage = (carbs.value / total) * 100;
  const fatPercentage = (fat.value / total) * 100;

  const vals = [
    { value: carbsPercentage, color: '#1ccad7' },
    { value: 1, color: 'white' }, // Gap
    { value: proteinPercentage, color: '#44d07b' },
    { value: 1, color: 'white' }, // Gap
    { value: fatPercentage, color: '#ea3b07' },
    { value: 1, color: 'white' }, // Gap
  ];
  return (
    <>
      <section>
        <Flex>
          <Paper shadow="xs" p="sm" withBorder className={classes.serving}>
            <Flex>
              <RingProgress
                sections={vals}
                size={115}
                thickness={10}
                label={
                  <>
                    <Text fw={500} className={classes.text}>
                      {kcal.value}
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
                    Protein: {protein.value}g (
                    <span className={classes.proteinText}>
                      {proteinPercentage.toFixed(2)}%
                    </span>
                    )
                  </Text>
                </Flex>
                <Flex align="center">
                  <div className={`${classes.circle} ${classes.carbs}`}></div>
                  <Text>
                    Net Carbs: {carbs.value}g (
                    <span className={classes.carbsText}>
                      {carbsPercentage.toFixed(2)}%
                    </span>
                    )
                  </Text>
                </Flex>
                <Flex align="center">
                  <div className={`${classes.circle} ${classes.fat}`}></div>
                  <Text>
                    Fat: {fat.value}g (
                    <span className={classes.fatText}>
                      {fatPercentage.toFixed(2)}%
                    </span>
                    )
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

export default FoodRingLog;
