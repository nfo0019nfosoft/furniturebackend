const mongoose =
require("mongoose");

const productSchema =
new mongoose.Schema({

name:{
type:String,
required:true
},

sku:String,

shortDescription:String,

description:String,

category:String,

brand:String,

tags:String,

images:[String],

sellingPrice:Number,

comparePrice:Number,

costPrice:Number,

taxClass:String,

stockQuantity:Number,

lowStock:Number,

stockStatus:String,

status:String,

visibility:String,

featured:Boolean,

weight:Number,

length:Number,

width:Number,

height:Number

},
{
timestamps:true
}
);

const Product =
mongoose.models.Product ||
mongoose.model(
"Product",
productSchema
);

module.exports = Product;