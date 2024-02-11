import {
  Button,
  Group,
  NumberInput,
  Select,
  Text,
  createStyles,
} from '@mantine/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFoodById, updateFood } from '../../../slices/foodsSlice';
import { getAllMacros } from '../../../utils/macroCalculations';
import FoodRingLog from './FoodRingLog';

const useStyles = createStyles(() => ({
  numInput: {
    maxWidth: '3rem',
  },
  section: {
    marginBottom: '10rem',
  },
}));

const FoodUpdate = ({ isOpen, foodId, onClose }) => {
  const dispatch = useDispatch();
  const food = useSelector((state) => selectFoodById(state, foodId));
  const {
    foodName,
    portionSize,
    availablePortionSizes,
    servingSize,
    nutrients,
  } = food;
  const [servingNumState, setServingNumState] = useState(servingSize);
  const [portionSizeState, setPortionSizeState] = useState(portionSize);
  const { classes } = useStyles();

  const handleUpdate = () => {
    const portionSplitValue = Number(portionSizeState.split('g')[0]);
    const originalPortion = Number(portionSize.split('g')[0]);
    const updatedMacros = getAllMacros(
      nutrients,
      servingNumState,
      portionSplitValue,
      originalPortion,
    );
    const updatedMacroValues = {
      servingSize: servingNumState,
      portionSize: portionSizeState,
      nutrients: updatedMacros,
    };
    dispatch(updateFood({ id: food._id, initialFood: updatedMacroValues }));
    onClose();
  };

  if (isOpen) {
    return (
      <>
        <section className={classes.section}>
          <div>
            <div>
              <Text ta="center" fw={600}>
                {foodName}
              </Text>
            </div>
          </div>
          <Group>
            <NumberInput
              className={classes.numInput}
              type="number"
              hideControls
              aria-label="Serving size"
              value={servingNumState}
              onChange={(e) => setServingNumState(e)}
              step={0.01}
              precision={1}
            />
            <Select
              data={availablePortionSizes}
              defaultValue={portionSizeState}
              onChange={(e) => setPortionSizeState(e)}
              dropdownPosition="bottom"
            />
          </Group>
        </section>
        <FoodRingLog
          food={nutrients}
          servingNum={servingNumState}
          selectValue={portionSizeState}
          isAddFood={false}
          previousSelectValue={Number(portionSize.split('g')[0])}
        />
        <Button onClick={handleUpdate}>Update</Button>
      </>
    );
  }
};

export default FoodUpdate;
