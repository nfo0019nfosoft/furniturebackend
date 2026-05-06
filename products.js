const express = require("express");
const router = express.Router();
const Product = require("./product");
const auth = require("./middleware");

// GET all
router.get("/", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

// GET by category
router.get("/:category", async (req, res) => {
  const data = await Product.find({
    category: req.params.category
  });
  res.json(data);
});

// ADD
router.post("/", auth, async (req, res) => {
  await Product.create(req.body);
  res.send("Product added");
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;