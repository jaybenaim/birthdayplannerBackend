const express = require("express"),
  createError = require("http-errors"),
  cookieParser = require("cookie-parser"),
  indexRouter = require("./routes/index"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  logger = require("morgan"),
  app = express();

require("dotenv").config();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Mongo - DB
var options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
};
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, options, err => {
  if (err) console.log(err);
  return console.log("Connected to DB");
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// TODO Web Template Studio: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
}

module.exports = app;
