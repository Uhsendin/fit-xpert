export const heightToCentimeters = (feet, inches) => {
  const feetToCm = feet * 30.48;
  const inchesToCm = inches * 2.54;
  const totalHeight = feetToCm + inchesToCm;
  return totalHeight;
};
