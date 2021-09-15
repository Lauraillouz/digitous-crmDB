const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordSchema = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const newUser = async (req, res) => {
  const { email, password } = req.body;
  const isPasswordValid = passwordSchema.test(password);
  const user = await User.findOne({ email });

  if (!user && isPasswordValid) {
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      await User.create({ email, password: hashedPassword });
      return res.status(201).json({
        message: `New user ${email} has been successfully created`,
      });
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  } else if (user) {
    res.status(400).json({
      message: "This email has already been used",
    });
  } else {
    res.status(400).json({
      message: "Please enter a valid email/password",
    });
  }
};

const getToken = () => {};

module.exports = { newUser, getToken };
