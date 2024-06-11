import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../utils/FoodMenuSlice";
import { assets } from "../../assets/assets";

const FoodItem = ({ item }) => {
  const dispatch = useDispatch();
  const add = () => {
    dispatch(addItem(item));
  };

  const remove = () => {
    dispatch(removeItem(item._id));
    
  };

  const cartItem = useSelector((store) =>
    store.menu.items.find((cartItem) => cartItem._id === item._id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="max-w-xs w-full bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 m-2">
      <div className="w-full h-48 relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg mb-2">{item.name}</span>
          <span>
            <img src={assets.rating_starts} alt="rating stars" />
          </span>
        </div>
        <p className="text-gray-700 text-sm mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-orange-600 font-bold text-xl">${item.price}</div>
          <div className="flex items-center">
            <img
              className="hover:cursor-pointer hover:scale-105"
              src={assets.add_icon_green}
              onClick={add}
              alt="Add"
            />
            <h1 className="p-2 font-bold text-orange-600">{quantity}</h1>
            <img
              className="hover:cursor-pointer hover:scale-105"
              src={assets.remove_icon_red}
              onClick={remove}
              alt="Remove"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
