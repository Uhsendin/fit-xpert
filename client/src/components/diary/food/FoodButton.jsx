import { Button, Center, createStyles } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewFood } from '../../../slices/foodDataBaseSlice';

const FoodButton = (servingNum, selectValue) => {
  const useStyles = createStyles(() => ({
    btn: {
      marginTop: '1rem',
    },
  }));
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const onClick = () => {};
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
