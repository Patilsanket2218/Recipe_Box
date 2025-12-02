const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const Recipe = require("../models/Recipe");

// Add to wishlist
router.post("/add", async (req, res) => {
  const { userEmail, recipeId } = req.body;

  try {
    const exists = await Wishlist.findOne({ userEmail, recipeId });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });

    const item = new Wishlist({ userEmail, recipeId });
    await item.save();
    res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get wishlist by email
router.get("/:email", async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userEmail: req.params.email }).populate("recipeId");
    res.status(200).json(wishlist.map((item) => item.recipeId));
  } catch (error) {
    res.status(500).json({ error: "Error fetching wishlist" });
  }
});

// Get count
router.get("/count/:email", async (req, res) => {
  try {
    const count = await Wishlist.countDocuments({ userEmail: req.params.email });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error getting wishlist count" });
  }
});

module.exports = router;

