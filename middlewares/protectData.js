const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config.env",
});
const killCookie = require("../utils/killCookie");

const protectData = async (req, res, next) => {
  try {
    const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECURE);
    req.cookies.jwtData = data;

    if (Date.now() === data.exp * 1000) {
      killCookie(res);
      return res.status(403).json({
        message: "Access denied. You token is invalid",
      });
    }

    const user = await User.findOne({ _id: data.id });
    if (user) {
      next();
    } else {
      res.status(403).json({
        message:
          "Access denied. You cannot access contacts of another user. Please try again with your own ID.",
      });
    }
  } catch (err) {
    console.log("middleware err");
    return res.status(401).json({
      message: err,
    });
  }
};

module.exports = protectData;
