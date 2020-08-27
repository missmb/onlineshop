const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category:String,
  image : String,
  price: { type: Number, required: true, minlength: 3 },
  description: { type: String , required: true},
  quantity: { type: String, required: true },
  createdAt: {
    type: String,
    default: Date.now()
  }
});

module.exports = Item = mongoose.model("Item", ItemSchema);
