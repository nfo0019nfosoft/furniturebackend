const mongoose =
require("mongoose");

const orderSchema =
new mongoose.Schema({

userName:{
type:String
},

userEmail:{
type:String,
required:true
},

phone:{
type:String
},

products:[{

id:String,

name:String,

image:String,

price:Number,

quantity:Number

}],

totalAmount:{
type:Number,
required:true
},

address:{
type:String,
required:true
},

paymentMethod:{
type:String,
required:true
},

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