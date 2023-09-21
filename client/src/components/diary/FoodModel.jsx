import { Modal, createStyles } from '@mantine/core';
import React from 'react';
import SearchInput from './SearchInput';

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 'bolder',
    fontSize: '1.3rem',
  },
}));

const FoodModel = ({ opened, onClose }) => {
  const { classes } = useStyles();
  return (
    <>
      <Modal
        size="60rem"
        opened={opened}
        onClose={onClose}
        title={<span className={classes.title}>Add Food to Diary</span>}
      >
        <SearchInput />
      </Modal>
    </>
  );
};

export default FoodModel;