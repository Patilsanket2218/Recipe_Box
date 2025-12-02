import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from './components/AdminDashboard';
import RecipeGallery from './pages/RecipeGallery';
import SingleRecipe from "./components/SingleRecipe";
import WishlistPage from "./components/WishlistPage";

// Wrapper component to handle conditional Navbar
const AppWrapper = () => {
  const location = useLocation();

  // Define routes where Navbar should NOT appear
  const hideNavbarOnRoutes = [
    "/login",
    "/signup",
    "/profile",
    "/admindashboard"
  ];

  // Check current route
  const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<div><h1>Our Products</h1></div>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/recipes" element={<RecipeGallery />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
