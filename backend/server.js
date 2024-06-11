require("dotenv").config();
const cloudinary = require('cloudinary');
const app= require('./app')
const port = process.env.PORT;

//connecting to database
const connectDB = require('./config/db');
connectDB();

//configuring cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_API_SECRETKEY,
});

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})

// mongodb+srv://divyanshuww:WVGmGjGPWEx9h6x5@cluster0.hi2pr4k.mongodb.net/?