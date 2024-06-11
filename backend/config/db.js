const mongoose = require('mongoose');
const connectDB = async()=> {
    try{
        await mongoose.connect(
          "mongodb+srv://divyanshuww:WVGmGjGPWEx9h6x5@cluster0.hi2pr4k.mongodb.net/food-app"
        );
        console.log("DataBase Connected Successfully");
    }
    
    catch(error){
        console.log("DB connection failed :");
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB