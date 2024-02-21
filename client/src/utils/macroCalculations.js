export const findNutrient = (food, nutrientIdentifier, isOrigin) => {
  if (isOrigin) {
    return food.foodNutrients.find(
      (nutrient) => nutrient.nutrientNumber === nutrientIdentifier,
    );
  }
  return food[nutrientIdentifier];
};

export const findPercentage = (macro, num, servingNum, total) => {
  let value = macro.value || macro;
  const result = ((value * servingNum * num) / total) * 100;
  if (Number.isNaN(result)) {
    return '0.00';
  } else {
    return result.toFixed(1);
  }
};

export const findNetMacro = (macro, servingNum, selectedPortion) => {
  if (macro.nutrientNumber !== '208') {
    return (((macro.value * servingNum) / 100) * selectedPortion).toFixed(1);
  } else {
    const kcal = (macro.value * servingNum) / 100;
    return Math.floor(kcal * selectedPortion);
  }
};

export const updateMacro = (
  macro,
  servingNum,
  selectedPortion,
  previousPortion,
) => {
  return (selectedPortion / previousPortion) * macro * servingNum;
};

export const getAllMacros = (
  macrosObj,
  servingNum,
  selectedPortion,
  previousPortion,
) => {
  const protein = macrosObj['protein'];
  const carbs = macrosObj['carbs'];
  const fat = macrosObj['fat'];
  const kcal = macrosObj['kcal'];
  return {
    kcal: Math.floor(
      updateMacro(kcal, servingNum, selectedPortion, previousPortion),
    ),
    protein: updateMacro(
      protein,
      servingNum,
      selectedPortion,
      previousPortion,
    ).toFixed(1),
    carbs: updateMacro(
      carbs,
      servingNum,
      selectedPortion,
      previousPortion,
    ).toFixed(1),
    fat: updateMacro(fat, servingNum, selectedPortion, previousPortion).toFixed(
      1,
    ),
  };
};

export const calculateNutrients = (food, servingNum, selectedPortion) => {
  const protein = findNutrient(food, '203', true);
  const carbs = findNutrient(food, '205', true);
  const fat = findNutrient(food, '204', true);
  const kcal =
    findNutrient(food, '208', true) || findNutrient(food, '957', true);

  return {
    kcal: findNetMacro(kcal, servingNum, selectedPortion),
    protein: findNetMacro(protein, servingNum, selectedPortion),
    carbs: findNetMacro(carbs, servingNum, selectedPortion),
    fat: findNetMacro(fat, servingNum, selectedPortion),
  };
};
