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

const FoodRingLog = ({ food, servingNum }) => {
  const { classes } = useStyles();

  const findNutrient = (food, nutrientNumber) => {
    return food.foodNutrients.find(
      (nutrient) => nutrient.nutrientNumber === nutrientNumber,
    );
  };

  const findPercentage = (macro) => {
    const result = ((macro.value * servingNum) / total) * 100;
    if (Number.isNaN(result)) {
      return '0.00';
    } else {
      return result.toFixed(2);
    }
  };

  const findNetMacro = (macro) => {
    if (macro.nutrientNumber !== '208') {
      return (macro.value * servingNum).toFixed(2);
    } else {
      return macro.value * servingNum;
    }
  };

  const protein = findNutrient(food, '203');
  const carbs = findNutrient(food, '205');
  const fat = findNutrient(food, '204');
  const kcal = findNutrient(food, '208') || findNutrientByNumber(food, '957');

  const total =
    protein.value * servingNum +
    carbs.value * servingNum +
    fat.value * servingNum;

  const vals = [
    { value: findPercentage(carbs), color: '#1ccad7' },
    { value: 1, color: 'white' }, // Gap
    { value: findPercentage(protein), color: '#44d07b' },
    { value: 1, color: 'white' }, // Gap
    { value: findPercentage(fat), color: '#ea3b07' },
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
                      {findNetMacro(kcal)}
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
                    Protein: {findNetMacro(protein)}g (
                    <span className={classes.proteinText}>
                      {findPercentage(protein)}%
                    </span>
                    )
                  </Text>
                </Flex>
                <Flex align="center">
                  <div className={`${classes.circle} ${classes.carbs}`}></div>
                  <Text>
                    Net Carbs: {findNetMacro(carbs)}g (
                    <span className={classes.carbsText}>
                      {findPercentage(carbs)}%
                    </span>
                    )
                  </Text>
                </Flex>
                <Flex align="center">
                  <div className={`${classes.circle} ${classes.fat}`}></div>
                  <Text>
                    Fat: {findNetMacro(fat)}g (
                    <span className={classes.fatText}>
                      {findPercentage(fat)}%
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
