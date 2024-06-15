/* eslint-disable no-unused-vars */
//import React from "react";
import { useSelector } from "react-redux";
import FoodItem from "../FoodItem/FoodItem";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myURL } from "../../utils/constants";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = () => {
  const category = useSelector((store) => store.foodcategory.selectedCategory);
  const { food_list, fetchFoodList, getTotalCartValues, loadCartItems } =
    useContext(StoreContext);
  const { totalCartItems } = getTotalCartValues();

  // const total = useSelector((store) => store.menu.total)
  // const [food,setFood]=useState([]);
  // const fetchFood = async() => {
  //   const response = await axios.get(myURL + "/api/food/allfooditems");
  //   setFood(response.data.food);
  // }

  // console.log(food);
  return (
    <div className="container mx-auto px-5 py-10 relative" id="food-display">
      <div className="max-w-[1280px] mx-auto relative">
        <h1 className="font-medium text-2xl mb-5">Top dishes near you</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {food_list
            .filter((item) => category === "All" || item.category === category)
            .map((item, index) => (
              <div key={item._id}>
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
        </div>
        {totalCartItems > 0 ? (
          <div
            className="fixed z-50 bottom-3 left-1/2 transform -translate-x-1/2 bg-[#60b246] flex justify-between p-2 rounded-md"
            style={{ width: "90%", maxWidth: "600px" }}
          >
            <h1 className="text-white font-semibold">
              {totalCartItems} item added
            </h1>
            <Link to={"/cart"}>
              <div className="flex gap-2 items-center">
                <h1 className="text-white font-semibold hover:text-gray-200">
                  View Cart
                </h1>
                <img
                  className="w-5 h-5"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart"
                  alt="Cart"
                />
              </div>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
