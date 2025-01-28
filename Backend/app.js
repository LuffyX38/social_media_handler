const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());



const userRoute = require("./src/routes/user.route");
const adminRoute = require("./src/routes/admin.route");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing api v2!!!!",
  });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/admin", adminRoute);

module.exports = app;
