const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./../auth");
const User = require("../models/userModel");
const db = require("mongoose");
var multer = require("multer");
var path = require("path");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image/user");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "user_" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, username } = req.body;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!username) username = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
});

router.get('/:user', async (req, res) => {
  try {
    const user = await User.findOne({username : req.params.user});
    if (!user)
      return res.status('400').json({
        error: "Product not found"
      })
     return res.status(200).json({ success: true, data : user});
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve product"
    })
  }
});

router.post ('/:user/editpic', multer({ storage: storage }).single("file"), async (req, res) => {

  User.findOne({username : req.params.user}).then((data) => {
    if (!data) res.status(404).send("data is not found");
    else {
      console.log(data.image)
      console.log(req.file.filename)
      if(data.image !== "/image/user/blankProfile.png"){
        fs.unlink("public/" + data.image, function (err) {
          if (err)  if (err) throw err;
          console.log("file has been deleted");
        });
      }
        (data.image = "/image/user/" + req.file.filename)
        data.save();
        res.status(200).send(data);
    }
  });
});

router.post ('/:user/edit',  async (req, res) => {
  console.log(req.params.user)
  console.log(req.params.name)
  User.findOne({username : req.params.user}).then((data) => {
    // const user = await User.findOne({username : req.params.user});
    // if (!user)
    //   return res.status('400').json({
    //     error: "Product not found"
    //   })
    //  return res.status(200).json({ success: true, data : user});
    if (!data) res.status(404).send("data is not found");
    else {
        (data.address = req.body.address),
        (data.bio = req.body.bio),
        (data.gender = req.body.gender),
        (data.phone = req.body.phone),
        data.save();
    //     let { address, bio, gender, phone} = req.body;

    //     const newItem = new Item({
    //       address, bio, gender, phone
    //     });
    //  User.save();
   console.log(data.email) 
   console.log(data.phone) 
   console.log(data.phone) 
   console.log(req.body.phone) 
    res.status(200).send(data);
    }
  });
});

module.exports = router;
