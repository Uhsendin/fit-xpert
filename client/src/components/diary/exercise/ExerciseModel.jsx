import { Modal } from "@mantine/core";
import React from "react";

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
        title={<span>Add Exercise to Diary</span>}
      ></Modal>
    </>
  );
};

export default ExerciseModel;
