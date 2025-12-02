const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
