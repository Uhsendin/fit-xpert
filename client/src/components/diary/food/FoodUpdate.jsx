import {
  Button,
  Center,
  Group,
  NumberInput,
  Select,
  Text,
  createStyles,
} from '@mantine/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFood,
  selectFoodById,
  updateFood,
} from '../../../slices/foodsSlice';
import { getAllMacros } from '../../../utils/macroCalculations';
import FoodRingLog from './FoodRingLog';

const useStyles = createStyles(() => ({
  title: {
    marginBottom: '2rem',
  },
  numInput: {
    maxWidth: '3rem',
  },
  section: {
    marginBottom: '2rem',
  },
  btn: {
    marginTop: '1rem',
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
  } = food || {};
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

  const handleDelete = () => {
    dispatch(deleteFood({ id: food._id }));
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          <section className={classes.section}>
            <div>
              <div>
                <Text className={classes.title} ta="center" fw={600}>
                  {foodName}
                </Text>
              </div>
            </div>
            <Center>
              <Group>
                <Text>Serving Size</Text>
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
            </Center>
          </section>
          <FoodRingLog
            food={nutrients}
            servingNum={servingNumState}
            selectValue={portionSizeState}
            isAddFood={false}
            previousSelectValue={Number(portionSize.split('g')[0])}
          />
          <Center>
            <Group>
              <Button
                className={classes.btn}
                type="submit"
                variant="light"
                radius="lg"
                size="lg"
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                className={classes.btn}
                color="red"
                type="submit"
                variant="light"
                radius="lg"
                size="lg"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Group>
          </Center>
        </>
      )}
    </>
  );
};

export default FoodUpdate;
