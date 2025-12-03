import React, { useEffect, useState } from "react";
import "./WishlistPage.css";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      fetch(`https://recipebox-og5e.onrender.com/api/wishlist/${userEmail}`)
        .then((res) => res.json())
        .then((data) => setWishlist(data))
        .catch((err) => console.error("Error fetching wishlist:", err));
    }
  }, [userEmail]);

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <p>No recipes in your wishlist yet.</p>
        ) : (
          wishlist.map((recipe) => (
            <div className="wishlist-card" key={recipe._id} style={{width:400}}>
              {recipe.imageUrl ? (
                <img src={recipe.imageUrl} alt={recipe.title} />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}
              <h3 style={{textAlign:"center"}}>{recipe.title}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
