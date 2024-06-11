//import React from "react";
import { useSelector } from "react-redux";
import FoodItem from "../FoodItem/FoodItem";
import {  food_list } from "../../assets/assets";
import { Link } from "react-router-dom";


const FoodDisplay = () => {
  const category = useSelector((store) => store.foodcategory.selectedCategory);
  const total = useSelector((store) => store.menu.total)
  console.log(total)

  return (
    <div className="container mx-auto px-5 py-10 relative" id="food-display">
      <div className="max-w-[1280px] mx-auto relative">
        <h1 className="font-medium text-2xl mb-5">Top dishes near you</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {food_list
            .filter((item) => category === "All" || item.category === category)
            .map((item) => (
              <div key={item._id}>
                <FoodItem item={item} />
              </div>
            ))}
        </div>
        {total > 0 ? (
          <div
            className="fixed z-50 bottom-3 left-1/2 transform -translate-x-1/2 bg-[#60b246] flex justify-between p-2 rounded-md"
            style={{ width: "90%", maxWidth: "600px" }}
          >
            <h1 className="text-white font-semibold">{total} item added</h1>
            <Link to={"/cart"}>
              <div className="flex gap-2 items-center">
                <h1 className="text-white font-semibold hover:text-gray-200">View Cart</h1>
                <img
                  className="w-5 h-5"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart"
                  alt="Cart"
                />
              </div>
            </Link>
          </div>
        ) : <></>}
      </div>
    </div>
  );
};

export default FoodDisplay;
