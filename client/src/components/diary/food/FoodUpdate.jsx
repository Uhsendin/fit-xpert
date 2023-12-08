import { NumberInput, Select, Text, createStyles } from '@mantine/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFoodById } from '../../../slices/foodsSlice';

const useStyles = createStyles(() => ({
  labelDiv: {
    border: '1px solid black',
  },
  labelName: {
    background: '#dddddd',
    borderBottom: 'solid 1px black',
  },
  labelContainer: {
    padding: '1rem',
  },
  divThinkLine: {
    background: 'black',
    marginTop: '.3rem',
    padding: '.3rem',
  },
  noPadding: {
    padding: '0 !important',
  },
  customBorder: {
    borderLeft: 0,
    borderRight: 0,
    borderColor: 'black',
  },
}));

const FoodUpdate = ({
  isOpen,
  servingNumState,
  portionSizeState,
  availablePortion,
}) => {
  const { classes } = useStyles();

  if (isOpen) {
    return (
      <>
        <section>
          <div className={classes.labelDiv}>
            <div className={classes.labelName}>
              <Text ta="center" fw={600}>
                {'foodName'}
              </Text>
            </div>
          </div>
          <NumberInput
            type="number"
            hideControls
            aria-label="Serving size"
            value={servingNumState}
            step={0.01}
            precision={1}
          />
          <Select data={availablePortion} defaultValue={portionSizeState} />
        </section>
      </>
    );
  }
};

export default FoodUpdate;
