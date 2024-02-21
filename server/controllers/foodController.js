import asyncHandler from 'express-async-handler';
import Food from '../models/foodModel.js';

// Desc     Create a new food
// route    POST /api/foods/
// access   Private
const createFood = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    foodId,
    foodName,
    portionSize,
    servingSize,
    nutrients,
    availablePortionSizes,
  } = req.body;

  if (
    !foodId ||
    !foodName ||
    !portionSize ||
    !servingSize ||
    !nutrients ||
    availablePortionSizes < 1
  ) {
    res.status(400).json({ error: 'All required fields must be provided.' });
  }

  if (
    !('kcal' in nutrients) ||
    !('protein' in nutrients) ||
    !('carbs' in nutrients) ||
    !('fat' in nutrients)
  ) {
    return res
      .status(400)
      .json({ error: 'Nutrients object must contain all required fields.' });
  }

  const food = new Food({
    user: userId,
    foodId,
    foodName,
    availablePortionSizes,
    portionSize,
    servingSize,
    nutrients,
  });

  const savedFood = await food.save();
  res.json(savedFood);
});

// Desc     Get all foods based on date range
// route    POST /api/foods/:date
// access   Private
const getFoodByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;
  const userId = req.user._id;
  const timestampDate = new Date(parseInt(date));
  const startDate = new Date(timestampDate).setHours(0, 0, 0, 0);
  const endDate = new Date(timestampDate).setHours(23, 59, 59, 999);

  const foods = await Food.find({
    createdAt: { $gte: startDate, $lt: endDate },
    user: userId,
  });

  if (foods === null) {
    res.status(404);
  }
  res.json(foods);
});

// Desc     Update food by id
// route    PUT /api/foods:id
// access   Private
const updateFoodById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const foodId = req.params.id;
  const { servingSize, portionSize, nutrients } = req.body;

  if (!servingSize || !portionSize || !nutrients) {
    return res
      .status(400)
      .json({ error: 'All required fields must be provided.' });
  }

  if (
    !('kcal' in nutrients) ||
    !('protein' in nutrients) ||
    !('carbs' in nutrients) ||
    !('fat' in nutrients)
  ) {
    return res
      .status(400)
      .json({ error: 'Nutrients object must contain all required fields.' });
  }

  const updatedFood = await Food.findOneAndUpdate(
    { _id: foodId, user: userId },
    { nutrients, servingSize, portionSize },
    { new: true },
  );

  if (updatedFood === null) {
    return res.status(404).json({
      status: 'Failed update request',
      message: `No food object was found with the ${foodId} was found`,
    });
  }

  res.json(updatedFood);
});

// Desc Delete single food
// DELETE /api/foods:id
// access Private
const deleteFoodById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const foodId = req.params.id;

  const deleteFood = await Food.findOneAndDelete({ _id: foodId, user: userId });

  if (deleteFood === null) {
    return res.status(404).json({
      status: 'Failed delete request',
      message: `No food object was found with the ${foodId} was found`,
    });
  }

  res.status(204).end();
});

export { createFood, getFoodByDate, updateFoodById, deleteFoodById };
