const express =
require("express");

const router =
express.Router();

const twilio =
require("twilio");


// TWILIO CLIENT

const client =
twilio(

process.env.TWILIO_ACCOUNT_SID,

process.env.TWILIO_AUTH_TOKEN

);


// OTP STORE

const otpStore = {};




// SEND OTP

router.post(
"/send-otp",
async(req,res)=>{

try{

const { phone } =
req.body;


if(!phone){

return res.json({

success:false,
message:"Phone number required"

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




// VERIFY OTP

router.post(
"/verify-otp",
async(req,res)=>{

try{

const { phone, otp } =
req.body;


if(!phone || !otp){

return res.json({

success:false,
message:"Fill all fields"

});

}


if(otpStore[phone] == otp){

delete otpStore[phone];

return res.json({

success:true,
message:"Login Success",

token:"demo_token"

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