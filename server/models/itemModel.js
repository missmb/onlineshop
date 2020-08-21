const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category:String,
  image : {
    data: Buffer,
    contentType: String
  },
  price: { type: String, required: true, minlength: 3 },
  description: { type: String , required: true},
  quantity: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("Item", ItemSchema);
