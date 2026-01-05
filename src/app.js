const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SimplyOrders API" });
});

// Health
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
  });
});

module.exports = app;