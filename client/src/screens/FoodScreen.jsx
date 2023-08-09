import React from 'react';
import { MainHeader } from '../components/MainHeader';
import { links } from '../constants/headerLinks';
const FoodScreen = () => {
  return (
    <div>
      <MainHeader links={links} />
      Food
    </div>
  );
};

export default FoodScreen;
