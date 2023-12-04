import { Table, createStyles, em } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import MaterialSymbolsAddNotes from '../../assets/MaterialSymbolsAddNotes';
import TwemojiRedApple from '../../assets/TwemojiRedApple';
import MdiRun from '../../assets/MdiRun';
import UpdateNoteModel from './note/UpdateNoteModel';
import UpdateFoodModel from './food/UpdateFoodModel';

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
  tr: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
const PanelTable = ({ rowDataArr }) => {
  const [openedNote, { open: openNote, close: closeNote }] =
    useDisclosure(false);
  const [openedFood, { open: openFood, close: closeFood }] =
    useDisclosure(false);
  const [selectedId, setSelctedId] = useState('');
  const { classes } = useStyles();

  const rowClick = (e, id, dataType) => {
    setSelctedId(id);
    if (dataType === 'notes') {
      openNote();
    } else if (dataType === 'foods') {
      openFood();
    }
  };

  const rows = rowDataArr.map((element) => (
    <tr
      className={classes.tr}
      key={element._id}
      onClick={(e) => rowClick(e, element._id, element.dataType)}
    >
      {element.dataType === 'notes' ? (
        <>
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
        </>
      ) : element.dataType === 'foods' ? (
        <>
          <td>
            <TwemojiRedApple />
          </td>
          <td>{element.foodName}</td>
          <td>{element.servingSize}</td>
          <td>{parseInt(element.portionSize.split('g')[0]) + 'g'}</td>
          <td>{element.nutrients.kcal}</td>
          <td>kcal</td>
        </>
      ) : // Add conditions for other cases if needed
        null}
    </tr>
  ));

  return (
    <>
      <Table fontSize="sm" striped highlightOnHover>
        <UpdateNoteModel
          opened={openedNote}
          onClose={closeNote}
          title="Update note"
          noteId={selectedId}
        />

        <UpdateFoodModel
          opened={openedFood}
          onClose={closeFood}
          foodId={selectedId}
        />
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default PanelTable;
