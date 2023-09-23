import { Tabs, createStyles } from '@mantine/core';
import React, { useState } from 'react';
import FoodTable from './FoodTable';

const useStyles = createStyles((theme) => ({
  tabList: {
    marginTop: '1rem',
  },
}));

const dummyDataAll = [
  {
    position: 6,
    mass: 12.011,
    symbol: 'C',
    name: 'this is the all table this is the all table',
  },
];
const dummyDataFav = [
  {
    position: 6,
    mass: 12.011,
    symbol: 'C',
    name: 'This the favorite table this is the favorite table',
  },
];
const dummyDataCus = [
  {
    position: 6,
    mass: 12.011,
    symbol: 'C',
    name: 'this is the custom table this is the custom table',
  },
];

const FoodTableTabs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { classes } = useStyles();
  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List grow className={classes.tabList}>
        <Tabs.Tab value="all">All</Tabs.Tab>
        <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
        <Tabs.Tab value="custom">Custom</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="all">
        <FoodTable tableData={dummyDataAll} />
      </Tabs.Panel>

      <Tabs.Panel value="favorites">
        <FoodTable tableData={dummyDataFav} />
      </Tabs.Panel>

      <Tabs.Panel value="custom">
        <FoodTable tableData={dummyDataCus} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default FoodTableTabs;
