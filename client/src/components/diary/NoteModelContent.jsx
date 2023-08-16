import {
  Modal,
  Textarea,
  createStyles,
  Text,
  Button,
  Center,
} from '@mantine/core';
import React, { useState } from 'react';

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 'bolder',
    fontSize: '1.3rem',
  },
  textArea: {
    margin: '.5rem 0',
  },
  btn: {
    margin: '1rem 0',
  },
}));

const NoteModelContent = ({ opened, onClose, title }) => {
  const { classes } = useStyles();
  const [textAreaValue, setTextAreaValue] = useState('');
  const charLimit = 1000;

  const handleTextAreaChange = (e) => {
    const value = e.target.value;
    if (value.length <= charLimit) {
      setTextAreaValue(value);
    }
  };

  const charCount = textAreaValue.length;
  return (
    <>
      <Modal
        size="40rem"
        opened={opened}
        onClose={onClose}
        title={<span className={classes.title}>{title}</span>}
      >
        <Textarea
          data-autofocus
          className={classes.textArea}
          placeholder="Add note..."
          radius="md"
          size="md"
          minRows="5"
          onChange={handleTextAreaChange}
          maxLength={charLimit}
        />
        <Text>
          {charCount}/{charLimit}
        </Text>
        <Center>
          <Button className={classes.btn} variant="light" radius="lg" size="lg">
            Save Note
          </Button>
        </Center>
      </Modal>
    </>
  );
};

export default NoteModelContent;
