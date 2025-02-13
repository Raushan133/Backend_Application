require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8080;
const app = express();
const authRoutes = require("./routes/authRoutes");
const database = require("./Configration/database");

// Database Calling
database();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`app is Listen on port ${port}`);
});
