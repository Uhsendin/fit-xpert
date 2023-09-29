import { Table, createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import FoodSummaryPanel from './FoodSummaryPanel';

const useStyles = createStyles((theme) => ({
  tableRow: {
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
    // maxHeight: '650px',
    maxHeight: '450px',
  },
}));

const FoodTable = ({ tableData }) => {
  const [selectedFoodById, setSelectedFoodById] = useState(null);
  const [isRowClicked, setIsRowClicked] = useState(false);

  const rowClick = (e, id) => {
    if (!isRowClicked) {
      setIsRowClicked(false);
    }
    setSelectedFoodById(id);
    setIsRowClicked(true);
  };
  const { classes } = useStyles();

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
      {isRowClicked && <FoodSummaryPanel />}
    </>
  );
};

export default FoodTable;
