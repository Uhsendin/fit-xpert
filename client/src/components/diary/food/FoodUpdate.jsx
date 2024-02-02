import {
  Button,
  Group,
  NumberInput,
  Select,
  Text,
  createStyles,
} from '@mantine/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFoodById } from '../../../slices/foodsSlice';
import { updateMacro } from '../../../utils/macroCalculations';

const useStyles = createStyles(() => ({
  numInput: {
    maxWidth: '3rem',
  },
  section: {
    marginBottom: '10rem',
  },
}));

const FoodUpdate = ({ isOpen, foodId }) => {
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
    console.log(nutrients);
    const portionState = Number(portionSizeState.split('g')[0]);
    const oldPortionState = Number(portionSize.split('g')[0]);
    const resultf = updateMacro(
      nutrients['kcal'],
      servingNumState,
      portionState,
      oldPortionState,
    );
    console.log(resultf);
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
        <Button onClick={handleUpdate}>Update</Button>
      </>
    );
  }
};

export default FoodUpdate;
