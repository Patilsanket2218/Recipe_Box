import React, { useState } from "react";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("https://recipebox-og5e.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
      } else {
        alert("Signup successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="signup-background">
    <div className="signup-container">
      <h2>Sign Up to Recipe Box</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/login" className="log">Login here</Link>
      </p>
    </div>
    </div>
  );
}

export default Signup;