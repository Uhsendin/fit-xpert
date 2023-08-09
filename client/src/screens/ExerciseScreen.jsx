import React from 'react';
import { MainHeader } from '../components/MainHeader';
import { links } from '../constants/headerLinks';

const ExerciseScreen = () => {
  return (
    <div>
      <MainHeader links={links} />
      Exercise
    </div>
  );
};

export default ExerciseScreen;
