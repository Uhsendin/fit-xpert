import React from 'react';
import { MainHeader } from '../components/MainHeader';

const links = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Food', link: '/food' },
  { label: 'Exercise', link: '/exercise' },
];

const ExerciseScreen = () => {
  return (
    <div>
      <MainHeader links={links} />
      Exercise
    </div>
  );
};

export default ExerciseScreen;
