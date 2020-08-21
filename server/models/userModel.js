const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  username: { type: String },
  createdAt: {
    type: String,
    default: Date.now()
  }
});

module.exports = User = mongoose.model("user", userSchema);
