require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const app = require("./app");
const connectDB = require("./config/db");

const port = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
  })
);

// Connect to database with error handling
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    // Configure Cloudinary with error handling
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_APIKEY,
        api_secret: process.env.CLOUD_API_SECRETKEY,
      });
      console.log("Cloudinary configured successfully");
    } catch (error) {
      console.error("Error configuring Cloudinary:", error.message);
    }

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
