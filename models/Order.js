const mongoose =
require("mongoose");

const orderSchema =
new mongoose.Schema({

userName:String,

productId:String,

productName:String,

productImage:String,

price:Number,

quantity:Number,

totalPrice:Number,

customerName:String,

phone:String,

address:String,

city:String,

state:String,

pincode:String,

paymentMethod:String,

status:{
type:String,
default:"Pending"
}

},
{
timestamps:true
});

module.exports =
mongoose.model(
"Order",
orderSchema
);