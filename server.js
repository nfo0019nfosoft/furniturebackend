const express =
require("express");

const mongoose =
require("mongoose");

const cors =
require("cors");

require("dotenv").config();

const app =
express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json({

limit:"50mb"

}));

app.use(express.urlencoded({

limit:"50mb",

extended:true

}));


// =========================
// STATIC FOLDER
// =========================

app.use(
express.static("public")
);


// =========================
// ROUTES IMPORT
// =========================

const categoryRoutes =
require("./routes/categoryRoutes");

const productRoutes =
require("./routes/productRoutes");

const authRoutes =
require("./routes/authRoutes");

const orderRoutes =
require("./routes/orderRoutes");


// OTP ROUTE IMPORT

const otpRoutes =
require("./routes/otp");




// =========================
// API ROUTES
// =========================

app.use(
"/api/products",
productRoutes
);

app.use(
"/api/categories",
categoryRoutes
);

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/orders",
orderRoutes
);


// OTP ROUTES

app.use(
"/api/otp",
otpRoutes
);




// =========================
// DATABASE CONNECTION
// =========================

mongoose.connect(

process.env.MONGO_URI

)

.then(()=>{

console.log(
"MongoDB Connected"
);

})

.catch((err)=>{

console.log(err);

});




// =========================
// SERVER
// =========================

const PORT =
process.env.PORT || 5000;

app.listen(PORT, ()=>{

console.log(

`Server running on port ${PORT}`

);

});