const express = require("express");
const router = express.Router();
const Admin = require("./admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create admin (run once)
router.post("/create", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  await Admin.create({
    username: req.body.username,
    password: hashed
  });

  res.send("Admin created");
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).send("User not found");

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).send("Wrong password");

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;