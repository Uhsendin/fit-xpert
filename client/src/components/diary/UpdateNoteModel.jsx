import {
  Modal,
  Textarea,
  createStyles,
  Text,
  Button,
  Loader,
  Center,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectNoteById } from '../../slices/notesSlice';

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

const UpdateNoteModel = ({ opened, onClose, title, noteId }) => {
  const [isSaving, setIsSaving] = useState(false);
  const { classes } = useStyles();
  const [textAreaValue, setTextAreaValue] = useState('');
  const charLimit = 1000;
  const dispatch = useDispatch();
  const note = useSelector((state) => selectNoteById(state, noteId));

  useEffect(() => {
    if (opened) {
      const { content } = note;
      setTextAreaValue(content);
    }
  }, [noteId]);

  const handleNoteBtn = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      // make a call
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
    const { content } = note;
    setTextAreaValue(content);
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
          className={classes.textArea}
          radius="md"
          size="md"
          value={textAreaValue}
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
            {isSaving ? <Loader /> : 'Update Note'}
          </Button>
        </Center>
      </Modal>
    </>
  );
};

export default UpdateNoteModel;
