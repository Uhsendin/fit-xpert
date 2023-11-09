import { Tabs, createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import FoodTable from './FoodTable';
import { useSelector } from 'react-redux';

const useStyles = createStyles((theme) => ({
  tabList: {
    marginTop: '1rem',
  },
}));

const FoodTableTabs = () => {
  const foodListSearch = useSelector((state) => state.food.foodsSearchList);
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
        {foodListSearch && <FoodTable tableData={foodListSearch.foods} />}
      </Tabs.Panel>
      {/**/}
      {/* <Tabs.Panel value="favorites"> */}
      {/*   <FoodTable tableData={dummyDataFav} /> */}
      {/* </Tabs.Panel> */}
      {/**/}
      {/* <Tabs.Panel value="custom"> */}
      {/*   <FoodTable tableData={dummyDataCus} /> */}
      {/* </Tabs.Panel> */}
    </Tabs>
  );
};

export default FoodTableTabs;
