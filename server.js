const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();


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

app.use(
"/api/auth",
authRoutes
);
const orderRoutes =
require("./routes/orderRoutes");

app.use(
"/api/orders",
orderRoutes
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
// API ROUTES
// =========================

app.use(
"/auth",
require("./auth")
);

app.use(
"/api/products",
productRoutes
);

app.use(
"/api/categories",
categoryRoutes
);


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