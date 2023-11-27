import { Button, Center, createStyles } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearFoodsSearchList } from '../../../slices/foodDataBaseSlice';
import { calculateNutrients } from '../../../utils/macroCalculations';
import { addNewFood } from '../../../slices/foodsSlice';

const FoodButton = ({
  servingNum,
  selectValue,
  food,
  onClose,
  portionsArr,
}) => {
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
      availablePortionSizes: portionsArr,
      portionSize: selectedGrams + 'g',
      servingSize: servingNum,
      nutrients,
    };

    dispatch(addNewFood(foodObj));
    // onClose comes from FoodModel and is pass down many components
    onClose();
    dispatch(clearFoodsSearchList());
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
