require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();

const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser");

//allowing cors sharing
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowed origins list or is undefined (for non-browser requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//middlewares
app.use(express.json());
app.use(cors());


//cookie and file middlewares
app.use(cookieParser());
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/temp/",
    })
  );

//importing all the routes here

const food= require('./routes/food')
const user =require('./routes/user')
const cart = require('./routes/cart')

app.use('/api/food',food);
app.use('/api/user',user);
app.use('/api/cart',cart);




app.get("/", (req, res) => {
  res.send("Hello Server");
});




//export app.js

module.exports = app;