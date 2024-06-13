const Food = require("../models/FoodModel");
const cloudinary = require("cloudinary").v2;

//add food Item
exports.addFood = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(Error("Please select a photo to upload "));
    }

    const { name, price, description, category } = req.body;
    if (!name || !price || !description || !category) {
      return next(Error("Name, Price, Description and Category is required."));
    }
    let file = req.files.image;
    let result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "food",
    });

    const food = await Food.create({
      name,
      price,
      description,
      category,
      image: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
    });
    res.json({
      success: true,
      message: "Food Added Successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//get all food Items
exports.getallFoodItems = async (req, res, next) => {
  try {
    const food = await Food.find();
    console.log(food);
    res.json({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const {id} =req.body;
    const food = await Food.findById(id);
    if (!food) {
      return next(Error("No user Found"));
    }
    const imageID = food.image.id;
    const photo = await cloudinary.uploader.destroy(imageID);

    const deletedFood = await Food.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Food Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

exports.getFoodDetails = async(req,res,next)=> {
  try{
    const {id} = req.params;
  const food = await Food.findById(id);
  if(!food){
    return next(Error("Food is not present enter correct id"))
  }
  res.status(200).json({
    success: true,
    food
  })
  }
  catch(error){
    console.log(error);
    res.json({
      success: false,
      message: "Error"
    })
  }
  
}
