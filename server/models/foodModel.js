import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dataType: {
      type: String,
      default: 'foods',
    },
    foodId: {
      type: Number,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    availablePortionSizes: {
      type: [
        {
          key: {
            type: Number,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
          label: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    portionSize: {
      type: String,
      required: true,
    },
    servingSize: {
      type: Number,
      required: true,
    },
    nutrients: {
      type: {
        kcal: {
          type: Number,
          required: true,
        },
        protein: {
          type: Number,
          required: true,
        },
        carbs: {
          type: Number,
          required: true,
        },
        fat: {
          type: Number,
          required: true,
        },
      },

      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Food = mongoose.model('Food', foodSchema);

export default Food;
