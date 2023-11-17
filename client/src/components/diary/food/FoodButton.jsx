import { Button, Center, createStyles } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewFood } from '../../../slices/foodDataBaseSlice';
import { calculateNutrients } from '../../../utils/macroCalculations';

const FoodButton = ({ servingNum, selectValue, food }) => {
  const useStyles = createStyles(() => ({
    btn: {
      marginTop: '1rem',
    },
  }));
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const onClick = () => {
    const selectedGrams = parseInt(selectValue.split('g')[0]);
    const { fdcId, description } = food;

    const nutrients = calculateNutrients(food, servingNum, selectedGrams);

    const foodObj = {
      foodId: fdcId,
      foodName: description,
      portionSize: selectedGrams + 'g',
      servingSize: servingNum,
      nutrients,
    };

    dispatch(addNewFood(foodObj));
  };
  return (
    <>
      <Center>
        <Button
          className={classes.btn}
          type="submit"
          variant="light"
          radius="lg"
          size="lg"
          onClick={onClick}
        >
          Save Food
        </Button>
      </Center>
    </>
  );
};

export default FoodButton;
