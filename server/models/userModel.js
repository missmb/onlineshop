const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  username: { type: String },
  address: { type: String },
  image: { type: String, default : "/image/user/blankProfile.png" },
  createdAt: {
    type: String,
    default: Date.now()
  }
});

module.exports = User = mongoose.model("user", userSchema);
