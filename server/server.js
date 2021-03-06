const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/userRoute");
const itemRoute = require("./routes/itemRoute");

// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
  // process.env.MONGODB_CONNECTION_STRING,
  "mongodb://localhost:1212/onlineshop",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    // if (err) throw err;
    if (err) throw console.log(err);
    console.log("MongoDB connection established");
  }
);
// // set up routes

app.use("/users", userRoute);
app.use("/items", itemRoute);