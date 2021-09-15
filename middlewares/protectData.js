const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config.env",
});

const protectData = (req, res, next) => {
  const userId = req.body.userId;

  try {
    if (userId === data.id) {
      const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECURE);
      req.cookies.jwtData = data;
      next();
    } else {
      res.status(403).json({
        message:
          "Access denied. You cannot add a contact for another user. Please try again with your own ID.",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: err,
    });
  }
};

module.exports = protectData;
