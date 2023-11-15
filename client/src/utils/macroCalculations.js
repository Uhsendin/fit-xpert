export const findNutrient = (food, nutrientNumber) => {
  return food.foodNutrients.find(
    (nutrient) => nutrient.nutrientNumber === nutrientNumber,
  );
};

export const findPercentage = (macro, num, servingNum, total) => {
  const result = ((macro.value * servingNum * num) / total) * 100;
  if (Number.isNaN(result)) {
    return '0.00';
  } else {
    return result.toFixed(1);
  }
};

export const findNetMacro = (macro, servingNum, selectedGrams) => {
  if (macro.nutrientNumber !== '208') {
    return (((macro.value * servingNum) / 100) * selectedGrams).toFixed(1);
  } else {
    const kcal = (macro.value * servingNum) / 100;
    return Math.floor(kcal * selectedGrams);
  }
};

export const calculateNutrients = (food, servingNum, selectedGrams) => {
  const protein = findNutrient(food, '203');
  const carbs = findNutrient(food, '205');
  const fat = findNutrient(food, '204');
  const kcal = findNutrient(food, '208') || findNutrient(food, '957');

  return {
    kcal: findNetMacro(kcal, servingNum, selectedGrams),
    protein: findNetMacro(protein, servingNum, selectedGrams),
    carbs: findNetMacro(carbs, servingNum, selectedGrams),
    fat: findNetMacro(fat, servingNum, selectedGrams),
  };
};
