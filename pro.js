const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  collectionName: String,

  name: String,

  price: String,

  category: String,

  image: String,

  description: String

});

module.exports =
  mongoose.model("Product", productSchema);