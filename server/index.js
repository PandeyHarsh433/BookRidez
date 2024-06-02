require("module-alias/register");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const UserRoutes = require("@routes/User");
const CustomerRoutes = require("@routes/Customer");
const MarketRoutes = require("@routes/MarketPlace");
const BookingRoutes = require("@routes/Booking");

const startServer = require("@utils/server");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://vrhaman.com',
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(morgan("[:date[web]] :method :url :status :response-time ms"));
app.use(helmet());
dotenv.config();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/", (req, res) => {
  res.send("<h1>Hiii...! I am live.</h1>");
});

app.use("/user", UserRoutes);
app.use("/customer", CustomerRoutes);
app.use("/market", MarketRoutes);
app.use("/", BookingRoutes);

app.use("*", (req, res) => {
  res.status(404).send("Api endpoint does not found");
});

startServer(app, () => {
  console.log("Server is running.");
});

module.exports = app;
