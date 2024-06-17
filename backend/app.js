require("dotenv").config()
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser");


const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
  })
);
// Use Helmet with CSP middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", "data:"],
    },
  })
);

// Morgan middleware
app.use(morgan("tiny"));

//cookie and file middlewares
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join("/tmp"), // Use the writable directory provided by the platform
  })
);

//importing all the routes here

const food= require('./routes/food')
const user =require('./routes/user')
const cart = require('./routes/cart')
const order = require('./routes/order')

app.use('/api/food',food);
app.use('/api/user',user);
app.use('/api/cart',cart);
app.use('/api/order',order);




app.get("/", (req, res) => {
  res.send("Hello Server");
});




//export app.js

module.exports = app;