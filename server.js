const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");
const queryString = require("query-string");

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

app.set("view engine", "ejs");
const access_token = "";

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// Route to Github
/* app.get("/", (_req, res) => {
  res.render("pages/index", { client_ID: clientID });
});
app.post("/github/callback", (req, res) => {
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((res) => {
    access_token = res.data.access_token;
    res.redirect("/success");
  });
});
app.get("/success", () => {
  axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: "token " + access_token,
    },
  }).then((res) => {
    res.render("pages/success", { userData: res.data });
  });
}); */
app.get("/github/callback");

// All Routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/contacts", contactsRouter);
app.use("/admin", adminRouter);

// SERVER ON
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
