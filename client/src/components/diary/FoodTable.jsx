import { Table, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  tableRow: {
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
    maxHeight: '650px',
  },
}));

const FoodTable = ({ tableData }) => {
  const { classes } = useStyles();

  const rows = tableData.map((element) => (
    <tr key={element.fdcId} className={classes.tableRow}>
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
    </>
  );
};

export default FoodTable;
