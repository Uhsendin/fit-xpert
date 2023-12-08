import { Modal } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import FoodUpdate from './FoodUpdate';
import { useSelector } from 'react-redux';
import { selectFoodById } from '../../../slices/foodsSlice';

const UpdateFoodModel = ({ opened, onClose, foodId }) => {
  const food = useSelector((state) => selectFoodById(state, foodId));
  const [servingNumState, setServingNumState] = useState('');
  const [portionSizeState, setPortionSizeState] = useState('');
  const [availablePortion, setAvailablePortion] = useState('');
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (opened && food) {
      console.log(food);
      setServingNumState(food.servingSize);
      setPortionSizeState(food.portionSize);
      setAvailablePortion(food.availablePortionSizes);
    }
  }, [opened, food]);

  const handleUpdate = () => {
    console.log('updated');
    onClose();
  };
  return (
    <Modal size="40rem" opened={opened} onClose={handleClose}>
      <FoodUpdate
        foodId={foodId}
        servingNumState={servingNumState}
        portionSizeState={portionSizeState}
        availablePortion={availablePortion}
        isOpen={opened}
      />
    </Modal>
  );
};

export default UpdateFoodModel;
