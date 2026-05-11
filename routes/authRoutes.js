const express =
require("express");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const nodemailer =
require("nodemailer");

const User =
require("../models/User");

const router =
express.Router();



// =========================
// REGISTER
// =========================

router.post(
"/register",
async(req,res)=>{

try{

const {
username,
email,
password
} = req.body;


// CHECK USER

const existing =
await User.findOne({email});

if(existing){

return res.json({

success:false,

message:"User already exists"

});

}


// HASH PASSWORD

const hashed =
await bcrypt.hash(
password,
10
);


// CREATE USER

const user =
await User.create({

username,
email,
password:hashed

});


// TOKEN

const token =
jwt.sign(

{
id:user._id,
username:user.username
},

"SECRETKEY"

);


// RESPONSE

res.json({

success:true,

message:"Registered Successfully",

token,

username:user.username,

email:user.email

});

}
catch(error){

res.json({

success:false,

message:error.message

});

}

});




// =========================
// LOGIN
// =========================

router.post(
"/login",
async(req,res)=>{

try{

const {
email,
password
} = req.body;


// FIND USER

const user =
await User.findOne({email});

if(!user){

return res.json({

success:false,

message:"User not found"

});

}


// CHECK PASSWORD

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


// TOKEN

const token =
jwt.sign(

{
id:user._id,
username:user.username
},

"SECRETKEY"

);


// RESPONSE

res.json({

success:true,

token,

username:user.username,

email:user.email

});

}
catch(error){

res.json({

success:false,

message:error.message

});

}

});




// =========================
// SEND OTP
// =========================

router.post(
"/send-otp",
async(req,res)=>{

try{

const { email } = req.body;


// FIND USER

const user =
await User.findOne({email});

if(!user){

return res.json({

success:false,

message:"Email not found"

});

}


// GENERATE OTP

const otp =
Math.floor(
100000 + Math.random()*900000
).toString();


// SAVE OTP

user.resetOtp = otp;

user.otpExpire =
Date.now() + 5*60*1000;

await user.save();


// NODEMAILER

const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{
user:process.env.EMAIL_USER,

pass:process.env.EMAIL_PASS

}

});


// SEND MAIL

await transporter.sendMail({

from:process.env.EMAIL_USER,

to:email,

subject:"Password Reset OTP",

html:`

<h2>Password Reset OTP</h2>

<h1>${otp}</h1>

<p>
OTP valid for 5 minutes
</p>

`

});


// RESPONSE

res.json({

success:true,

message:"OTP Sent Successfully"

});

}
catch(error){

res.json({

success:false,

message:error.message

});

}

});




// =========================
// RESET PASSWORD
// =========================

router.post(
"/reset-password",
async(req,res)=>{

try{

const {
email,
otp,
newPassword
} = req.body;


// FIND USER

const user =
await User.findOne({email});

if(!user){

return res.json({

success:false,

message:"User not found"

});

}


// CHECK OTP

if(user.resetOtp !== otp){

return res.json({

success:false,

message:"Invalid OTP"

});

}


// CHECK EXPIRE

if(user.otpExpire < Date.now()){

return res.json({

success:false,

message:"OTP Expired"

});

}


// HASH PASSWORD

const hashed =
await bcrypt.hash(
newPassword,
10
);


// UPDATE PASSWORD

user.password =
hashed;

user.resetOtp = null;

user.otpExpire = null;

await user.save();


// RESPONSE

res.json({

success:true,

message:"Password Reset Successful"

});

}
catch(error){

res.json({

success:false,

message:error.message

});

}

});




// =========================
// DELETE ACCOUNT
// =========================

router.delete(
"/delete-account",
async(req,res)=>{

try{

const { email } = req.body;


// DELETE USER

await User.findOneAndDelete({
email
});


// RESPONSE

res.json({

success:true,

message:"Account Deleted"

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