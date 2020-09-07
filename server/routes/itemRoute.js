const router = require("express").Router();
const Item = require("../models/itemModel");
const db = require("mongoose");
var multer = require("multer");
var path = require("path");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image/item");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "item_" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.post("/add", multer({ storage: storage }).single("file"), async (req, res) => {
  try {
    let { name, category, price, description, quantity} = req.body;

    let image = "/image/item/" + req.file.filename;
    
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
      name, category, image , price, description, quantity
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

router.get('/detail/:name', async (req, res) => {
  try {
    const item = await Item.findOne({name : req.params.name});
    if (!item)
      return res.status('400').json({
        error: "Product not found"
      })
     return res.status(200).json({ success: true, data : item});
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve product"
    })
  }
});
// router.post("/add", multer({ storage: storage }).single("file"), async (req, res) => {

router.post ('/detail/:name/edit', multer({ storage: storage }).single("file"), async (req, res) => {
  
  // router.post ('/detail/:name/edit', async (req, res) => {
  Item.findOne({name : req.params.name}).then((data) => {
    if (!data) res.status(404).send("data is not found");
    else {
      console.log(data.image)
      fs.unlink("public/" + data.image, function (err) {
        if (err)  if (err) throw err;
        console.log("file has been deleted");
      });
        (data.image = "/image/item/" + req.file.filename),
        // (data.name = req.body.name),
        (data.category = req.body.address),
        (data.description = req.body.description),
        (data.price = req.body.price),
        (data.quantity = req.body.quantity),
        data.save();
    }
  });
});

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

  fs.unlink("public/" + req.body.filename, function (err) {
    if (err)  if (err) throw err;
    console.log("file has been deleted");
  });
  
});



module.exports = router;
