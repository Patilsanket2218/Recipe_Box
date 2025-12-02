// src/components/RecipeGallery.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeGallery.css";

function RecipeGallery() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const categories = [
    "Indian Food",
    "Italian Food",
    "Chinese Food",
    "Thai Food",
    "Dessert Food",
    "Salad",
    "Mexican Food",
  ];

  const handleWishlistClick = async (e, recipe) => {
    e.stopPropagation();
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please login to add to wishlist");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, recipeId: recipe._id }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Added to wishlist!");
      } else {
        alert(data.message || "Already in wishlist");
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      alert("Error adding to wishlist");
    }
  };

  const renderCategorySection = (category) => {
    const filtered = recipes.filter((recipe) => recipe.category === category);
    if (filtered.length === 0) return null;

    return (
      <div key={category} className="category-section">
        <h2>{category}</h2>
        <div className="card-container">
          {filtered.map((recipe) => (
            <div
              className="recipe-card"
              key={recipe._id}
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              style={{ cursor: "pointer" }}
            >
              {recipe.imageUrl ? (
                <img src={recipe.imageUrl} alt={recipe.title} />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}
              <div className="card-header">
                <h3>{recipe.title}</h3>
                <button
                  className="wishlist-btn"
                  onClick={(e) => handleWishlistClick(e, recipe)}
                  title="Add to Wishlist"
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="recipe-gallery">
      <h1>Recipe Gallery</h1>
      {categories.map((category) => renderCategorySection(category))}
    </div>
  );
}

export default RecipeGallery;
