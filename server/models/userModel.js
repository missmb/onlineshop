const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  username: { type: String },
  address: { type: String ,  default :"alamat"},
  bio: { type: String,  default : "bio"},
  gender: { type: String,  default :"malea" },
  phone: { type: Number ,  default : 0},
  image: { type: String, default : "/image/user/user_1600714309203.jpg" },
  createdAt: {
    type: String,
    default: Date.now()
  }
});

module.exports = User = mongoose.model("user", userSchema);
