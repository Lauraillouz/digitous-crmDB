const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  });

// Routers
const registerRouter = require("./routers/registerRouter");
const loginRouter = require("./routers/loginRouter");
const contactsRouter = require("./routers/contactsRouter");
const adminRouter = require("./routers/adminRouter");

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// Routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/contacts", contactsRouter);
app.use("/admin", adminRouter);

// SERVER ON
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
