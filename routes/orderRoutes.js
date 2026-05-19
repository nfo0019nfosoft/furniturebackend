const express =
require("express");

const router =
express.Router();

const Order =
require("../models/Order");


/* ========================= */
/* PLACE ORDER */
/* ========================= */

router.post(
"/",
async(req,res)=>{

try{

const {

userName,
userEmail,
phone,
products,
totalAmount,
address,
paymentMethod

} = req.body;


// CREATE ORDER

const order =
new Order({

userName,
userEmail,
phone,
products,
totalAmount,
address,
paymentMethod

});


// SAVE ORDER

const saved =
await order.save();


// RESPONSE

res.json({

success:true,

message:"Order Placed Successfully",

data:saved

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

});




/* ========================= */
/* GET ALL ORDERS */
/* ========================= */

router.get(
"/",
async(req,res)=>{

try{

const orders =
await Order.find()
.sort({ createdAt:-1 });

res.json({

success:true,

orders

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

});




/* ========================= */
/* GET USER ORDERS */
/* ========================= */

router.get(
"/user-orders/:email",
async(req,res)=>{

try{

const { email } =
req.params;


// FIND USER ORDERS

const orders =
await Order.find({

userEmail: email

})
.sort({ createdAt:-1 });


// RESPONSE

res.json({

success:true,

orders

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

});




/* ========================= */
/* GET SINGLE ORDER */
/* ========================= */

router.get(
"/:id",
async(req,res)=>{

try{

const order =
await Order.findById(
req.params.id
);

if(!order){

return res.status(404).json({

success:false,

message:"Order Not Found"

});

}

res.json({

success:true,

order

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

});




/* ========================= */
/* UPDATE ORDER */
/* ========================= */

router.put(
"/:id",
async(req,res)=>{

try{

const updatedOrder =
await Order.findByIdAndUpdate(

req.params.id,

req.body,

{ new:true }

);

res.json({

success:true,

message:"Order Updated",

data:updatedOrder

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

});




/* ========================= */
/* DELETE ORDER */
/* ========================= */

router.delete(
"/:id",
async(req,res)=>{

try{

await Order.findByIdAndDelete(
req.params.id
);

res.json({

success:true,

message:"Order Deleted"

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

});




/* ========================= */
/* EXPORT */
/* ========================= */

module.exports =
router;