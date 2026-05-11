const express =
require("express");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const User =
require("../models/User");

const router =
express.Router();


// REGISTER

router.post(
"/register",
async(req,res)=>{

try{

const {
username,
email,
password
} = req.body;

const existing =
await User.findOne({email});

if(existing){

return res.json({
success:false,
message:"User already exists"
});

}

const hashed =
await bcrypt.hash(
password,
10
);

const user =
await User.create({

username,
email,
password:hashed

});

res.json({

success:true,
message:"Registered Successfully"

});

}
catch(error){

res.json({
success:false,
message:error.message
});

}

});


// LOGIN

router.post(
"/login",
async(req,res)=>{

try{

const {
email,
password
} = req.body;

const user =
await User.findOne({email});

if(!user){

return res.json({
success:false,
message:"User not found"
});

}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return res.json({
success:false,
message:"Invalid Password"
});

}

const token =
jwt.sign(

{
id:user._id,
username:user.username
},

"SECRETKEY"

);

res.json({

success:true,

token,

username:user.username

});

}
catch(error){

res.json({
success:false,
message:error.message
});

}

});

module.exports =
router;