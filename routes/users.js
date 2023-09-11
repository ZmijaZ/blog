var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("./authMiddleware");

// localhost:x000/api/users
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", protect, userController.getMe);

module.exports = router;
