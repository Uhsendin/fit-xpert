import { Button, Center, createStyles } from '@mantine/core';
import React from 'react';

const FoodButton = () => {
  const useStyles = createStyles(() => ({
    btn: {
      marginTop: '1rem',
    },
  }));
  const { classes } = useStyles();
  return (
    <>
      <Center>
        <Button
          className={classes.btn}
          type="submit"
          variant="light"
          radius="lg"
          size="lg"
        >
          Save Food
        </Button>
      </Center>
    </>
  );
};

export default FoodButton;
