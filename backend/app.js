require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();

const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser");

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

app.use('/api/food',food);
app.get("/", (req, res) => {
  res.send("Hello Server");
});




//export app.js

module.exports = app;