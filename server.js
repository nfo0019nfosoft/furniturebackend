const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 ADD THIS LINE
app.use(express.static("public"));

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes
app.use("/auth", require("./auth"));
app.use("/products", require("./products"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});