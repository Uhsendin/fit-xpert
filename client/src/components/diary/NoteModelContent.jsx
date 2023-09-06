import {
  Modal,
  Textarea,
  createStyles,
  Text,
  Button,
  Loader,
  Center,
} from '@mantine/core';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addNewNote } from '../../slices/notesSlice';
import { useDispatch } from 'react-redux';

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
  const [isSaving, setIsSaving] = useState(false);
  const { classes } = useStyles();
  const [textAreaValue, setTextAreaValue] = useState('');
  const charLimit = 1000;
  const dispatch = useDispatch();

  const handleNoteBtn = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      dispatch(addNewNote({ content: textAreaValue }));
      setTextAreaValue('');
      onClose();
    } catch (err) {
      toast.error(err?.data.error || err.error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTextAreaValue('');
  };

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
        onClose={handleClose}
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
          <Button
            type="submit"
            onClick={handleNoteBtn}
            className={classes.btn}
            variant="light"
            radius="lg"
            size="lg"
            disabled={textAreaValue.length < 3}
          >
            {isSaving ? <Loader /> : 'Save Note'}
          </Button>
        </Center>
      </Modal>
    </>
  );
};

export default NoteModelContent;
