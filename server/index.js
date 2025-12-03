const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profileRoutes");
const recipeRoutes = require("./routes/recipeRoutes"); // ✅ NEW
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Static file serving (for images if used)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/recipes", recipeRoutes); // ✅ NEW
app.use("/api/wishlist", wishlistRoutes);

// MongoDB connection
mongoose.connect("mongodb+srv://sp5768528_db_user:T53ff3wJ7vlX62pN@recipebox.hohwhub.mongodb.net/?appName=RecipeBox")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
