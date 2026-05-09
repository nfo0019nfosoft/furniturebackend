const express = require("express");

const router = express.Router();

const Category =
require("../models/category");


// ======================================
// GET ALL CATEGORIES
// ======================================

router.get("/", async (req, res) => {

  try {

    const categories =
    await Category.find()
    .sort({ sortOrder: 1 });

    res.json(categories);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ======================================
// ADD CATEGORY
// ======================================

router.post("/", async (req, res) => {

  try {

    const newCategory =
    new Category({

      name:
      req.body.name,

      parentCategory:
      req.body.parentCategory,

      image:
      req.body.image,

      sortOrder:
      req.body.sortOrder,

      status:
      req.body.status

    });

    const savedCategory =
    await newCategory.save();

    res.json(savedCategory);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ======================================
// DELETE CATEGORY
// ======================================

router.delete("/:id", async (req, res) => {

  try {

    await Category.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
      "Category Deleted"

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message

    });

  }

});


// ======================================
// UPDATE CATEGORY
// ======================================

router.put("/:id", async (req, res) => {

  try {

    const updated =
    await Category.findByIdAndUpdate(

      req.params.id,

      {

        name:
        req.body.name,

        parentCategory:
        req.body.parentCategory,

        image:
        req.body.image,

        sortOrder:
        req.body.sortOrder,

        status:
        req.body.status

      },

      { new: true }

    );

    res.json(updated);

  } catch (error) {

    res.status(500).json({

      message:
      error.message

    });

  }

});

module.exports = router;