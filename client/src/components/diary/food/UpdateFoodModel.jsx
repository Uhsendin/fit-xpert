import { Modal } from '@mantine/core';
import React, { useState } from 'react';
import FoodUpdate from './FoodUpdate';
import { useSelector } from 'react-redux';
import { selectFoodById } from '../../../slices/foodsSlice';

const UpdateFoodModel = ({ opened, onClose, foodId }) => {
  const food = useSelector((state) => selectFoodById(state, foodId));
  const [servingNumState, setServingNumState] = useState(
    food.servingSize || null,
  );
  const [portionSizeState, setPortionSizeState] = useState(
    food.portionSize || null,
  );

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = () => {
    console.log('updated');
    onClose();
  };

  return (
    <Modal size="40rem" opened={opened} onClose={handleClose}>
      <FoodUpdate
        foodId={foodId}
        servingNumState={servingNumState}
        setServingNumState={setServingNumState}
        portionSizeState={portionSizeState}
        setPortionSizeState={setPortionSizeState}
        isOpen={opened}
      />
    </Modal>
  );
};

export default UpdateFoodModel;
