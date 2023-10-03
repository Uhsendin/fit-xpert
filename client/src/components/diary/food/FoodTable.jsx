import { Table, createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import FoodSummaryPanel from './FoodSummaryPanel';
import { useSelector } from 'react-redux';
import { selectFoodById } from '../../../slices/foodDataBaseSlice';

const useStyles = createStyles((theme) => ({
  tableRow: {
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
    // maxHeight: '650px',
    maxHeight: '400px',
  },
}));

const FoodTable = ({ tableData }) => {
  const [FoodId, setFoodId] = useState(null);
  const [isRowClicked, setIsRowClicked] = useState(false);

  const rowClick = (e, id) => {
    if (!isRowClicked) {
      setIsRowClicked(false);
    }
    setFoodId(id);
    setIsRowClicked(true);
  };
  const { classes } = useStyles();

  const food = useSelector((state) => selectFoodById(state, FoodId));
  const rows = tableData.map((element) => (
    <tr
      key={element.fdcId}
      className={classes.tableRow}
      onClick={(e) => rowClick(e, element.fdcId)}
    >
      <td>{element.description}</td>
    </tr>
  ));

  return (
    <>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} striped highlightOnHover withBorder>
          <thead>
            <tr>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
      {isRowClicked && <FoodSummaryPanel foodId={food} />}
    </>
  );
};

export default FoodTable;
