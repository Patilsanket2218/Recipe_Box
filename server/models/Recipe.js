const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Indian Food",
        "Italian Food",
        "Chinese Food",
        "Thai Food",
        "Dessert Food",
        "Salad",
        "Mexican Food"
      ],
      required: true,
    },
    timeRequired: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // <-- Added this field
      default: "",   // Optional: default empty string
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
