const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  bio: { type: String },
  profileImage: { type: String } // Store image filename or URL
});

module.exports = mongoose.model("Profile", profileSchema);
