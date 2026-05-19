const express = require("express");

const router = express.Router();


// SEND OTP
router.post("/send-otp", async(req,res)=>{

try{

const { phone } = req.body;

if(!phone){

return res.json({
success:false,
message:"Phone number required"
});

}


// RANDOM OTP
const otp =
Math.floor(100000 + Math.random() * 900000);

console.log("OTP:", otp);


// TEMP RESPONSE

res.json({

success:true,
message:`OTP Sent Successfully`,
otp

});

}
catch(error){

console.log(error);

res.json({
success:false,
message:"Server Error"
});

}

});




// VERIFY OTP
router.post("/verify-otp", async(req,res)=>{

try{

const { phone, otp } = req.body;

if(!phone || !otp){

return res.json({
success:false,
message:"Fill all fields"
});

}


// DEMO VERIFY

if(otp == "123456"){

return res.json({

success:true,
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



module.exports = router;