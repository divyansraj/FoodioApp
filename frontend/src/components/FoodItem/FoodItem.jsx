/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../utils/FoodMenuSlice";
import { assets } from "../../assets/assets";
import axios from "axios";
import { myURL } from "../../utils/constants";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id,name,price,description,image }) => {
  // const dispatch = useDispatch();

  // const token = useSelector((store) => store.auth.token);
  // const add = async() => {
  //   dispatch(addItem(item));
  //   if(token){
  //     await axios.post(
  //       myURL + "/api/cart/add",
  //       { itemId: item._id },
  //       { headers: { token } }
  //     );
  //   }
    
  // };

  // const remove = async() => {
  //   dispatch(removeItem(item._id));
  //   if(token){
  //     await axios.post(
  //       myURL + "/api/cart/delete",
  //       { itemId: item._id },
  //       { headers: { token } }
  //     );
  //   }
    
    
  // };

  // const load =async()=> {
  //   const response =await axios.post(myURL +"/api/cart/items",{},{headers: {token}})
  //   console.log(response.data.cartData);
  // }

  // useEffect(()=> {
  //   load();
  // },[])

  // const cartItem = useSelector((store) =>
  //   store.menu.items.find((cartItem) => cartItem._id === item._id)
  // );
  // const quantity = cartItem ? cartItem.quantity : 0;

  const {cartItems,addToCart,removeFromCart} = useContext(StoreContext)

  return (
    <div className="max-w-xs w-full bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 m-2">
      <div className="w-full h-48 relative">
        <img src={image.secure_url} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg mb-2">{name}</span>
          <span>
            <img src={assets.rating_starts} alt="rating stars" />
          </span>
        </div>
        <p className="text-gray-700 text-sm mb-4">{description}</p>

        <div className="flex items-center justify-between">
          <div className="text-orange-600 font-bold text-xl">${price}</div>
          {!cartItems[id] ? (
            <div>
              <img
                className=" w-10 shadow-md rounded-full hover:cursor-pointer hover:scale-105"
                onClick={() => addToCart(id)}
                src={assets.add_icon_white}
              />
            </div>
          ) : (
            <div className="flex items-center">
              <img
                className="hover:cursor-pointer hover:scale-105"
                src={assets.remove_icon_red}
                onClick={() => removeFromCart(id)}
                alt="Remove"
              />
              <h1 className="p-2 font-bold text-orange-600">{cartItems[id]}</h1>
              <img
                className="hover:cursor-pointer hover:scale-105"
                src={assets.add_icon_green}
                onClick={() => addToCart(id)}
                alt="Add"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
