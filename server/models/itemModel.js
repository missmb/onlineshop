const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  nameItem: { type: String, required: true, unique: true },
  category:[{}],
  price: { type: String, required: true, minlength: 3 },
  unit: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("item", itemSchema);
