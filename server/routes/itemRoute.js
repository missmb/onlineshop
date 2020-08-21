const router = require("express").Router();
const Item = require("../models/itemModel");
const db = require("mongoose");

router.post("/add", async (req, res) => {
  try {
    let { name, category, image, price, description, quantity} = req.body;

    if (!name || !category || !image || !price || !description || !quantity)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (price.length < 3)
      return res
        .status(400)
        .json({ msg: "The price needs to be at least 3 numbers long." });

    const existingItem = await Item.findOne({ name: name });
    if (existingItem)
      return res
        .status(400)
        .json({ msg: "An Product with this name already exists." });

    const newItem = new Item({
      name, category, image, price, description, quantity
    });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    if (!items) throw Error('No items');

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item)
//       return res.status('400').json({
//         error: "Product not found"
//       })
    
//   } catch (err) {
//     return res.status('400').json({
//       error: "Could not retrieve product"
//     })
//   }
// });

router.delete('/delete/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error('No item found');

    const removed = await item.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the item');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
