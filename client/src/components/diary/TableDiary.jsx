import React, { useEffect, useRef, useState } from 'react';
import { Table, createStyles, em } from '@mantine/core';
import MaterialSymbolsAddNotes from '../../assets/MaterialSymbolsAddNotes';
import { selectAllNotes, selectNoteById } from '../../slices/notesSlice';
import { useSelector } from 'react-redux';
import UpdateNoteModel from './UpdateNoteModel';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  contentWrapper: {
    [`@media (max-width: ${em(540)})`]: {
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}));

const TableDiary = () => {
  const notes = useSelector(selectAllNotes);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [isRowClicked, setIsRowClicked] = useState(false);
  const { classes } = useStyles();

  useEffect(() => {
    if (isRowClicked) {
      console.log(selectedNoteId);
      setIsRowClicked(false);
    }
  }, [selectedNoteId]);

  const rowClick = (e, id) => {
    setSelectedNoteId(id);
    setIsRowClicked(true);
    open();
  };

  const rows = notes.map((element) => (
    <tr key={element._id} onClick={(e) => rowClick(e, element._id)}>
      <td>
        <MaterialSymbolsAddNotes />
      </td>
      <td>
        <div className={classes.contentWrapper}>{element.content}</div>
      </td>
      <td>{element.value}</td>
      <td>{element.valuePlus}</td>
      <td>{element.calVal}</td>
      <td>{element.kcal}</td>
    </tr>
  ));

  return (
    <>
      <Table fontSize="sm" striped highlightOnHover>
        <tbody>{rows}</tbody>
      </Table>
      <UpdateNoteModel
        opened={opened}
        onClose={close}
        title="Update Note"
        noteId={selectedNoteId}
      />
    </>
  );
};

export default TableDiary;
