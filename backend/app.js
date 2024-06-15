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