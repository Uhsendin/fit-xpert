import { Modal } from "@mantine/core";
import React from "react";
import SearchInput from "./SearchInput";

const ExerciseModel = ({ opened, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Modal
        size="60rem"
        opened={opened}
        onClose={handleClose}
        title={<span>Add Exercises to Diary</span>}
      >
        <SearchInput />
      </Modal>
    </>
  );
};

export default ExerciseModel;
