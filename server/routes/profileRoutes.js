const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Profile = require("../models/Profile");

// Save or update profile
router.post("/save", upload.single("profileImage"), async (req, res) => {
  const { email, name, bio } = req.body;
  const profileImage = req.file ? req.file.filename : undefined;

  try {
    let profile = await Profile.findOne({ email });

    if (profile) {
      // Update existing profile
      profile.name = name;
      profile.bio = bio;
      if (profileImage) profile.profileImage = profileImage;
    } else {
      // Create new profile
      profile = new Profile({
        email,
        name,
        bio,
        profileImage
      });
    }

    await profile.save();
    res.json({ message: "Profile saved successfully", profile });
  } catch (error) {
    console.error("Profile save error:", error);
    res.status(500).json({ message: "Failed to save profile" });
  }
});

// Get profile
router.get("/:email", async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

module.exports = router;
