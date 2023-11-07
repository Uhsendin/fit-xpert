import asyncHandler from 'express-async-handler';
import Food from '../models/foodModel.js';

// Desc     Create a new food
// route    POST /api/foods
// access   Private
const createFood = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { foodId, foodName, portionSize, servingSize, nutrients } = req.body;

  if (!foodId || !foodName || !portionSize || !servingSize || !nutrients) {
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
    portionSize,
    servingSize,
    nutrients,
  });

  const savedFood = await food.save();
  res.json(savedFood);
});

export { createFood };
