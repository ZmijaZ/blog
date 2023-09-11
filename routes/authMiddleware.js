const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asynHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token form headers
      token = req.headers.authorization.split(" ")[1];

      //verify token, returns pre-encoded object
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      // get user from the token, without the password
      req.user = await User.findById(decoded.id).select("-password");

      //because it's only a  middleware to authorize the token
      return next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: "Not authorized" });
      throw new Error("Not authorized");
    }
  } else {
    console.error("Authorization header error");
  }

  if (!token) {
    res.status(401).json({ error: "No token" });
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
