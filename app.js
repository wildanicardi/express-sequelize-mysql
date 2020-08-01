const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var cors = require("cors");

// import route
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const materiRoute = require("./routes/materi");
// const Sequelize = require("sequelize");

dotenv.config();
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

// middleware
app.use(express.json());
// route middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/materis", materiRoute);

// route
app.get("/", (req, res, next) => {
  res.send("Hello Express");
});

app.listen(() => console.log(`Example app listening on port 8080`));
module.exports = app;