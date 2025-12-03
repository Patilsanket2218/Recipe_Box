import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("registers");
  const [users, setUsers] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "Indian Food",
    timeRequired: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (activePage === "registers") {
      fetch("https://recipebox-og5e.onrender.com/api/auth/all-users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          const grouped = {};
          data.forEach((user) => {
            const date = new Date(user.createdAt).toLocaleDateString();
            grouped[date] = (grouped[date] || 0) + 1;
          });
          const graph = Object.entries(grouped).map(([date, count]) => ({
            date,
            count,
          }));
          setGraphData(graph);
        })
        .catch((err) => console.error("Failed to fetch users:", err));
    } else if (activePage === "recipes") {
      fetchRecipes();
    }
  }, [activePage]);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("https://recipebox-og5e.onrender.com/api/recipes");
      setRecipes(res.data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://recipebox-og5e.onrender.com/api/recipes/${editingId}`, formData);
      } else {
        await axios.post("https://recipebox-og5e.onrender.com/api/recipes", formData);
      }
      setFormData({
        title: "",
        category: "Indian Food",
        timeRequired: "",
        ingredients: "",
        instructions: "",
        imageUrl: "",
      });
      setEditingId(null);
      fetchRecipes();
    } catch (err) {
      console.error("Failed to submit recipe:", err);
    }
  };

  const handleEdit = (recipe) => {
    setFormData({
      title: recipe.title,
      category: recipe.category,
      timeRequired: recipe.timeRequired,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });
    setEditingId(recipe._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://recipebox-og5e.onrender.com/api/recipes/${id}`);
      fetchRecipes();
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "registers":
        return (
          <div className="register-report">
            <h2>Registered Users Report</h2>
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="register-graph">User Registrations Over Time</h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#4CAF50"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "recipes":
        return (
          <div className="recipe-manager">
            <h2>Manage Recipes</h2>
            <form onSubmit={handleRecipeSubmit} className="recipe-form">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Indian Food</option>
                <option>Italian Food</option>
                <option>Chinese Food</option>
                <option>Thai Food</option>
                <option>Dessert Food</option>
                <option>Salad</option>
                <option>Mexican Food</option>
              </select>
              <textarea
                type="text"
                placeholder="Time Required (e.g., 30 mins)"
                value={formData.timeRequired}
                onChange={(e) => setFormData({ ...formData, timeRequired: e.target.value })}
                required
              />
              <textarea
                type="text"
                placeholder="Ingredients"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                required
              />
              <textarea
                type="text"
                placeholder="Instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                required
              />

              {/* 🔗 Image URL Input */}
              <input
                type="text"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />

              <button type="submit">{editingId ? "Update Recipe" : "Add Recipe"}</button>
            </form>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Time</th>
                  <th>Ingredients</th>
                  <th>Instructions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr key={recipe._id}>
                    <td>
                      {recipe.imageUrl && (
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          width="80"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                      )}
                    </td>
                    <td>{recipe.title}</td>
                    <td>{recipe.category}</td>
                    <td>{recipe.timeRequired}</td>
                    <td>{recipe.ingredients}</td>
                    <td>{recipe.instructions}</td>
                    <td>
                      <button onClick={() => handleEdit(recipe)}>Edit</button>
                      <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "settings":
        return <div><h2>Admin Settings</h2></div>;
      case "messages":
        return <div><h2>User Messages</h2></div>;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActivePage("registers")}>Registers</li>
          <li onClick={() => setActivePage("recipes")}>Recipes</li>
          <li onClick={() => setActivePage("settings")}>Settings</li>
          <li onClick={() => setActivePage("messages")}>Messages</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
