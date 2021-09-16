const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config.env",
});

const checkRights = async (req, res, next) => {
  const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECURE);
  req.cookies.jwtData = data;

  const user = await User.findOne({ _id: data.id });

  if (user.category === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Admin rights are required for this action.",
    });
  }
};

module.exports = checkRights;
