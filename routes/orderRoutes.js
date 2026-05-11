const express =
require("express");

const router =
express.Router();

const Order =
require("../models/Order");


// PLACE ORDER

router.post(
"/",
async(req,res)=>{

try{

const order =
new Order(req.body);

const saved =
await order.save();

res.json({

success:true,

message:"Order Placed",

data:saved

});

}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

});


// GET ALL ORDERS

router.get(
"/",
async(req,res)=>{

try{

const orders =
await Order.find()
.sort({createdAt:-1});

res.json(orders);

}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

});

module.exports =
router;