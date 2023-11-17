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
  },
}));

const FoodTable = ({ tableData, onClose }) => {
  const [FoodId, setFoodId] = useState(null);
  const [isRowClicked, setIsRowClicked] = useState(false);

  useEffect(() => {
    setFoodId(null);
    setIsRowClicked(false);
  }, [tableData]);

  const rowClick = (e, id) => {
    if (!isRowClicked) {
      setIsRowClicked(true);
    }
    setFoodId(id);
  };
  const { classes } = useStyles();

  const food = useSelector((state) => selectFoodById(state, FoodId));
  const isFoodDefined = food !== undefined && food !== null;

  const wrapperStyle = {
    maxHeight: isRowClicked ? '360px' : '650px',
    overflowx: 'hidden',
  };

  const rows = Array.isArray(tableData)
    ? tableData.map((element) => (
      <tr
        key={element.fdcId}
        className={classes.tableRow}
        onClick={(e) => rowClick(e, element.fdcId)}
      >
        <td>{element.description}</td>
      </tr>
    ))
    : [];

  return (
    <>
      <div className={classes.tableWrapper} style={wrapperStyle}>
        <Table className={classes.table} striped highlightOnHover withBorder>
          <thead>
            <tr>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
      {isRowClicked && isFoodDefined && (
        <FoodSummaryPanel
          food={food}
          setIsRowClicked={setIsRowClicked}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default FoodTable;
