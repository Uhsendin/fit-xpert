import {
  Checkbox,
  CloseButton,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  createStyles,
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import FoodRingLog from './FoodRingLog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodById } from '../../../slices/foodDataBaseSlice';
import FoodButton from './FoodButton';

const useStyles = createStyles((theme) => ({
  text: {
    textAlign: 'center',
    margin: '1rem 0',
  },
  numInput: {
    maxWidth: '3rem',
  },
  serving: {
    height: '100%',
    width: '100%',
  },
  closeBtn: {
    margin: '0.5rem 0 0 auto',
  },
}));

const FoodSummaryPanel = ({ food, setIsRowClicked, onClose }) => {
  const { classes } = useStyles();
  const [servingNum, setServingNum] = useState(1);
  const [selectValue, setSelectValue] = useState('100g-1');
  const effectRan = useRef(false);
  const currentFood = useSelector((state) => state.food.currentFood);
  const currentStatus = useSelector((state) => state.food.currentFoodStatus);
  const dispatch = useDispatch();
  const portionsArr = [];

  useEffect(() => {
    if (effectRan.current) {
      dispatch(fetchFoodById(food.fdcId));
    }
    effectRan.current = true;
  }, [food]);

  const handleClose = () => {
    setIsRowClicked(false);
  };

  const foodDataProcessor = () => {
    if (currentFood.dataType === 'Foundation' && currentFood.foodPortions) {
      currentFood.foodPortions.forEach((portion) => {
        const { id, gramWeight, measureUnit, amount } = portion;
        portionsArr.push({
          key: id,
          value: gramWeight + 'g' + `-${id}`,
          label: `${amount} ${measureUnit.name} (${gramWeight}g)`,
        });
      });
    } else if (
      currentFood.dataType === 'SR Legacy' &&
      currentFood.foodPortions
    ) {
      currentFood.foodPortions.forEach((portion) => {
        const { id, gramWeight, modifier, amount } = portion;
        portionsArr.push({
          key: id,
          value: gramWeight + 'g' + `-${id}`,
          label: `${amount} ${modifier} (${gramWeight}g)`,
        });
      });
    } else if (currentFood.dataType === 'Survey (FNDDS)') {
      currentFood.foodPortions.forEach((portion) => {
        const { id, gramWeight, portionDescription } = portion;
        portionsArr.push({
          key: id,
          value: gramWeight + 'g' + `-${id}`,
          label: `${portionDescription} (${gramWeight}g)`,
        });
      });
    } else if (currentFood.dataType === 'Branded') {
      const { fdcId, servingSize, servingSizeUnit, householdServingFullText } =
        currentFood;
      portionsArr.push({
        key: fdcId,
        value: servingSize + servingSizeUnit + `-${fdcId}`,
        label: `${householdServingFullText} (${servingSize} ${servingSizeUnit})`,
      });
    }
    portionsArr.push({ key: 1, value: '100g-1', label: '100g' });
  };

  if (currentStatus === 'loading') {
    return <div>Loading....</div>;
  }

  if (currentStatus === 'succeeded') {
    foodDataProcessor();
    return (
      <>
        <CloseButton
          className={classes.closeBtn}
          aria-label="close modal"
          size="xs"
          iconSize={20}
          onClick={handleClose}
        />
        <Text fz="lg" className={classes.text}>
          {currentFood.description}
        </Text>
        <Grid grow gutter="xs">
          <Grid.Col span={6}>
            <FoodRingLog
              food={food}
              servingNum={servingNum}
              selectValue={selectValue}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper shadow="xs" p="sm" withBorder className={classes.serving}>
              <Stack spacing="xl" justify="space-evenly">
                <Group>
                  <Text fz="lg">Time of day</Text>
                  <Checkbox size="md" />
                </Group>
                <Group>
                  <Text fz="lg">Serving Size</Text>
                  <NumberInput
                    className={classes.numInput}
                    type="number"
                    hideControls
                    aria-label="Serving size"
                    value={servingNum}
                    onChange={setServingNum}
                    step={0.01}
                    precision={1}
                  />
                  <Select
                    defaultValue={selectValue}
                    data={portionsArr}
                    onChange={setSelectValue}
                  />
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
        <FoodButton
          servingNum={servingNum}
          selectValue={selectValue}
          food={food}
          onClose={onClose}
        />
      </>
    );
  }
};

export default FoodSummaryPanel;
