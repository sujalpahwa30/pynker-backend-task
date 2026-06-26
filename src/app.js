const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const db = require("./config/database");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use(errorHandler); 

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend API is running"
  });
});

module.exports = app;