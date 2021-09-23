const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");

// Routers
const registerRouter = require("./routers/registerRouter");
const loginRouter = require("./routers/loginRouter");
const contactsRouter = require("./routers/contactsRouter");
const adminRouter = require("./routers/adminRouter");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  });

// Middlewares
app.use(
  cors(/* {
    origin: "http://localhost:3000",
    credentials: true,
  } */)
);
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

app.all("/", (_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Home
app.get("/", (_req, res) => {
  res.json({
    message: "Hello",
  });
});

// All Routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/contacts", contactsRouter);
app.use("/admin", adminRouter);

// SERVER ON
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3001");
});
