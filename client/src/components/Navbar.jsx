// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    setIsLoggedIn(!!token);
    if (email) {
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/api/wishlist/count/${userEmail}`)
        .then((res) => res.json())
        .then((data) => setWishlistCount(data.count || 0))
        .catch((err) => console.error("Error fetching wishlist count:", err));
    }
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Recipe Box</div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/recipes">Food Categories</Link></li>
      </ul>

      <div className="navbar-login">
        <Link to="/wishlist" className="wishlist-btn" title="Wishlist">
          ❤️ {wishlistCount > 0 && (
            <span className="wishlist-count">{wishlistCount}</span>
          )}
        </Link>

        {isLoggedIn ? (
          <>
            <button onClick={handleProfile} className="profile-btn">Profile</button>
            <button onClick={handleLogout} className="login-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
