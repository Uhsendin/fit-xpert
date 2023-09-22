import { Tabs, Table, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  tabList: {
    marginTop: '1rem',
  },
  tableRow: {
    cursor: 'pointer',
  },
}));

const TableTabs = () => {
  const { classes } = useStyles();
  return (
    <Tabs defaultValue="all">
      <Tabs.List grow className={classes.tabList}>
        <Tabs.Tab value="all">All</Tabs.Tab>
        <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
        <Tabs.Tab value="custom">Custom</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="all">Should render all foods</Tabs.Panel>

      <Tabs.Panel value="favorites">Should render favorites</Tabs.Panel>

      <Tabs.Panel value="custom">Should render custom meals made</Tabs.Panel>
    </Tabs>
  );
};
const elements = [
  {
    position: 6,
    mass: 12.011,
    symbol: 'C',
    name: 'Tomato Raw, includes Cherry, Grape, Roma',
  },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
const FoodTable = () => {
  const { classes } = useStyles();

  const rows = elements.map((element) => (
    <tr key={element.name} className={classes.tableRow}>
      <td>{element.name}</td>
    </tr>
  ));

  return (
    <>
      <TableTabs />
      <Table className={classes.table} striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default FoodTable;
