import {
  Button,
  Group,
  NumberInput,
  Select,
  Text,
  createStyles,
} from '@mantine/core';
import React from 'react';

const useStyles = createStyles(() => ({
  numInput: {
    maxWidth: '3rem',
  },
  section: {
    height: '300px',
  },
}));

const FoodUpdate = ({
  isOpen,
  servingNumState,
  portionSizeState,
  availablePortion,
  foodName,
}) => {
  const { classes } = useStyles();

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
              step={0.01}
              precision={1}
            />
            <Select
              data={availablePortion}
              defaultValue={portionSizeState}
              dropdownPosition="bottom"
            />
          </Group>
          <Button>Update Food</Button>
        </section>
      </>
    );
  }
};

export default FoodUpdate;
