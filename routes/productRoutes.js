const express = require("express");

const router = express.Router();

const Product =
require("../models/Product");


// =========================
// GET ALL PRODUCTS
// =========================

router.get("/", async(req,res)=>{

  try{

    const products =
    await Product.find()
    .sort({createdAt:-1});

    res.json(products);

  }

  catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

});


// =========================
// GET PRODUCTS BY CATEGORY
// =========================

router.get(
"/category/:name",
async(req,res)=>{

try{

const products =
await Product.find({

category:
req.params.name

}).sort({createdAt:-1});

res.json(products);

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

});


// =========================
// GET SINGLE PRODUCT
// =========================

router.get("/:id", async(req,res)=>{

  try{

    const product =
    await Product.findById(
      req.params.id
    );

    if(!product){

      return res.status(404).json({
        success:false,
        message:"Product not found"
      });

    }

    res.json(product);

  }

  catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

});


// =========================
// ADD PRODUCT
// =========================

router.post("/", async(req,res)=>{

  try{

    const product =
    new Product(req.body);

    const saved =
    await product.save();

    res.status(201).json({

      success:true,

      message:"Product Added",

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


// =========================
// UPDATE PRODUCT
// =========================

router.put("/:id", async(req,res)=>{

  try{

    const updated =
    await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new:true,
        runValidators:true
      }

    );

    if(!updated){

      return res.status(404).json({

        success:false,

        message:"Product not found"

      });

    }

    res.json({

      success:true,

      message:"Product Updated",

      data:updated

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});


// =========================
// DELETE PRODUCT
// =========================

router.delete("/:id", async(req,res)=>{

  try{

    const deleted =
    await Product.findByIdAndDelete(
      req.params.id
    );

    if(!deleted){

      return res.status(404).json({

        success:false,

        message:"Product not found"

      });

    }

    res.json({

      success:true,

      message:"Product Deleted"

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

module.exports = router;