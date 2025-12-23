var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
const cors = require("cors");

var app = express();

/* DB CONFIG */
const DB_URL = require("./config/keys").MongoURI;

/* CONNECT MONGO */
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

/* MIDDLEWARE */
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* PASSPORT */
require("./auth/auth");

/* ROUTES IMPORT */
const busRoutes = require("./routes/bus");
const login = require("./routes/login");
const loggedInPage = require("./routes/loggedInUser");
const bookingRoute = require("./routes/routeSelection");
const registerRouter = require("./routes/register");
const saveTicket = require("./routes/saveTicket");

/* ROUTES USE */
app.use("/bus", busRoutes);          // ✅ BUS API
app.use("/", login);
app.use("/booking", bookingRoute);
app.use("/register", registerRouter);
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  loggedInPage
);
app.use("/ticket", saveTicket);

module.exports = app;