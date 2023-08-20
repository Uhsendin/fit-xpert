import React from 'react';
import { Table, createStyles, em } from '@mantine/core';
import MaterialSymbolsAddNotes from '../../assets/MaterialSymbolsAddNotes';

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
const elements = [
  {
    img: MaterialSymbolsAddNotes,
    content:
      'dfaea minim sdfes nulla est proident. Nostrud officia pariatur ut dks jsdkf jskdf sd kj ksdj ksadfjasf asd fasdf asd fsad fsda asd fdsa as aff officia.',
    value: '',
    valuePlus: '',
    calVal: '',
    kcal: '',
  },
];

const TableDiary = () => {
  const { classes } = useStyles();
  const rows = elements.map((element) => (
    <tr key={element.content}>
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
