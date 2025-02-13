const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Middleware = require("../middleware/AuthMiddleware");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  const {
    username,
    email,
    password,
    fullName,
    gender,
    date_of_Birth,
    country,
  } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = new User({
    username,
    email,
    password: hashedPassword,
    fullName,
    gender,
    date_of_Birth,
    country,
  });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const Email = await User.findOne({ email });

    if (!Email) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, Email.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: Email._id }, process.env.JWT_SECRET, {
      expiresIn: "30h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/view", Middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const user = await User.findOne({
      $or: [{ username: query }, { email: query }],
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
