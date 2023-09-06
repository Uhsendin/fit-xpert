import React, { useRef } from 'react';
import { Table, createStyles, em } from '@mantine/core';
import MaterialSymbolsAddNotes from '../../assets/MaterialSymbolsAddNotes';
import {
  selectAllNotes,
  getNotesStatus,
  getNotesError,
  fetchNotes,
} from '../../slices/notesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

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
  const dispatch = useDispatch();
  const effectRan = useRef(false);
  const notes = useSelector(selectAllNotes);
  const notesStatus = useSelector(getNotesStatus);
  const notesError = useSelector(getNotesError);

  useEffect(() => {
    if (notesStatus === 'idle' && !effectRan.current) {
      dispatch(fetchNotes());
    }
    return () => (effectRan.current = true);
  }, [notesStatus, dispatch]);

  const { classes } = useStyles();
  const rows = notes.map((element) => (
    <tr key={element._id}>
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
    <Table fontSize="sm" striped highlightOnHover>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default TableDiary;
