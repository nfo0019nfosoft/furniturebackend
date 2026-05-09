const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  parentCategory: {
    type: String,
    default: "-"
  },
image:{
  type:String,
  default:""
},

sortOrder:{
  type:Number,
  default:1
},
  products: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: "Active"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Category",
  categorySchema
);