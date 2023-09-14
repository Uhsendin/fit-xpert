import React from 'react';
import { Table, createStyles, em } from '@mantine/core';
import MaterialSymbolsAddNotes from '../../assets/MaterialSymbolsAddNotes';
import { selectAllNotes } from '../../slices/notesSlice';
import { useSelector } from 'react-redux';

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
