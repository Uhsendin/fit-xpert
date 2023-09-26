import { Modal, createStyles } from '@mantine/core';
import React from 'react';
import SearchInput from './SearchInput';
import FoodTableTabs from './FoodTableTabs';
import { useDispatch } from 'react-redux';
import { clearFoods } from '../../slices/foodDataBaseSlice';

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 'bolder',
    fontSize: '1.3rem',
  },
}));

const FoodModel = ({ opened, onClose }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
    dispatch(clearFoods());
  };
  const { classes } = useStyles();
  return (
    <>
      <Modal
        size="60rem"
        opened={opened}
        onClose={handleClose}
        title={<span className={classes.title}>Add Food to Diary</span>}
      >
        <SearchInput />
        <FoodTableTabs />
      </Modal>
    </>
  );
};

export default FoodModel;
