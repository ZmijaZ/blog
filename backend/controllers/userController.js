const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = asyncHandler(async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;

  if (!(username && password && confirmPassword)) {
    return res.status(400).json({ message: "Fill the entire form" });
  }

  if (password != confirmPassword) {
    return res.status(401).json({ message: "Passwords do not match" });
  }

  const userExists = await User.findOne({ username: username });
  if (userExists) {
    return res.status(400).json({ message: "Username taken" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({
    username: username,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  } else {
    return res.status(201).json({
      id: user.id,
      username: username,
      confirm: password === confirmPassword,
    });
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).json({ message: "Fill the entire form" });
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(401).json({ message: "Username doesn't exist" });
  }

  const passwordCheck = await bcryptjs.compare(password, user.password);
  if (!passwordCheck) {
    return res.status(400).json({ message: "Invalid password" });
  } else {
    return res.status(201).json({
      id: user._id,
      username: username,
      token: generateToken(user._id),
    });
  }
});

exports.getMe = asyncHandler(async (req, res, next) => {
  return res.json(req.user);
});

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "30s" });
}
