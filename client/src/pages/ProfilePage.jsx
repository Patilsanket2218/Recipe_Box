import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchProfile(storedEmail);
    }
  }, []);

  const fetchProfile = async (email) => {
    try {
      const res = await fetch(`https://recipebox-og5e.onrender.com/api/profile/${email}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name || "");
        setBio(data.bio || "");
        if (data.profileImage) {
          setImagePreview(`https://recipebox-og5e.onrender.com/uploads/${data.profileImage}`);
        }
      }
    } catch (err) {
      console.log("No existing profile found", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const res = await fetch("https://recipebox-og5e.onrender.com/api/profile/save", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Profile saved successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to save profile.");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("An error occurred.");
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile Customization</h2>

      <div className="profile-header">
        <div className="image-section">
          <img
            src={imagePreview || "https://via.placeholder.com/120"}
            alt="Profile"
            className="profile-img"
          />
        </div>

        <div className="info-section">
          <p><strong>Name:</strong> {name || "Not set"}</p>
          <p><strong>Bio:</strong> {bio || "Not set"}</p>
        </div>
      </div>

      {!isEditing ? (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          Edit Profile
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <label htmlFor="name">Edit Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="bio">Edit Bio:</label>
          <textarea
            id="bio"
            placeholder="Write something about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            required
          />

          <label htmlFor="profileImage">Change Profile Picture:</label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit">Save Changes</button>
        </form>
      )}

      {/* Add the back button below the edit button */}
      <button className="back-btn" onClick={() => window.location.href = '/'}>
        <span>←</span> Back to Home
      </button>
    </div>
  );
}

export default ProfilePage;
