import { Modal } from '@mantine/core';
import React from 'react';
import FoodUpdate from './FoodUpdate';

const UpdateFoodModel = ({ opened, onClose, foodId }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal size="30rem" opened={opened} onClose={handleClose}>
      <FoodUpdate foodId={foodId} isOpen={opened} onClose={onClose} />
    </Modal>
  );
};

export default UpdateFoodModel;
