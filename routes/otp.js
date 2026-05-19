const express =
require("express");

const router =
express.Router();

const twilio =
require("twilio");

const jwt =
require("jsonwebtoken");

const User =
require("../models/User");


// TWILIO CLIENT

const client =
twilio(

process.env.TWILIO_ACCOUNT_SID,

process.env.TWILIO_AUTH_TOKEN

);


// OTP STORE

const otpStore = {};




// =========================
// SEND OTP
// =========================

router.post(
"/send-otp",
async(req,res)=>{

try{

const {
phone,
email
} = req.body;


// VALIDATION

if(!phone || !email){

return res.json({

success:false,
message:"Phone and Email required"

});

}


// CHECK USER

const user =
await User.findOne({ email });

if(!user){

return res.json({

success:false,
message:"Please Register First"

});

}


// RANDOM OTP

const otp =
Math.floor(
100000 + Math.random() * 900000
);


// SAVE OTP

otpStore[phone] = otp;


// SEND WHATSAPP OTP

await client.messages.create({

from:
process.env.TWILIO_WHATSAPP_NUMBER,

to:
`whatsapp:${phone}`,

body:
`Your OTP is ${otp}`

});


// RESPONSE

res.json({

success:true,
message:"OTP Sent Successfully"

});

}
catch(error){

console.log(error);

res.json({

success:false,
message:"Failed To Send OTP"

});

}

});




// =========================
// VERIFY OTP
// =========================

router.post(
"/verify-otp",
async(req,res)=>{

try{

const {
phone,
otp,
email
} = req.body;


// VALIDATION

if(!phone || !otp || !email){

return res.json({

success:false,
message:"Fill all fields"

});

}


// FIND USER

const user =
await User.findOne({ email });

if(!user){

return res.json({

success:false,
message:"User Not Found"

});

}


// CHECK OTP

if(otpStore[phone] == otp){

delete otpStore[phone];


// JWT TOKEN

const token =
jwt.sign(

{
id:user._id,
username:user.username
},

"SECRETKEY"

);


// SUCCESS RESPONSE

return res.json({

success:true,

message:"Login Success",

token,

username:user.username,

email:user.email

});

}
else{

return res.json({

success:false,
message:"Invalid OTP"

});

}

}
catch(error){

console.log(error);

res.json({

success:false,
message:"Server Error"

});

}

});



module.exports =
router;