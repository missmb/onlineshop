const router = require("express").Router();
const Item = require("../models/itemModel");

router.post("/add", async (req, res) => {
  try {
    let { name, category, price, unit } = req.body;


    const newItem = new Item({
      name,
      category,
      price,
      unit
    });
    const savedItem = await newItem.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:idItem", async (req, res) => {
  url = req.params.item;
  item = url.split("-").join(" ");
  Item.find({ nameItem: item }, function (err, DataItem) {
    return res.status(200).json({ success: true, data: DataItem });
  }).sort({ _id: -1 });
});

module.exports = router;
