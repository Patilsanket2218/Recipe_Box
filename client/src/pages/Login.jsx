// src/components/Login.js
import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for admin login first
    const isAdmin =
      formData.email === "admin@example.com" &&
      formData.password === "admin123";

    if (isAdmin) {
      alert("Admin login successful!");
      localStorage.setItem("role", "admin");
      localStorage.setItem("userEmail", formData.email);
      navigate("/AdminDashboard");
      return;
    }

    // Regular user login
    try {
      const res = await fetch("https://recipebox-og5e.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
      } else {
        alert("Login successful!");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("role", "user");
        navigate("/");
        setTimeout(() => window.location.reload(), 100);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Login to Recipe Box</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "1rem" }}>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
