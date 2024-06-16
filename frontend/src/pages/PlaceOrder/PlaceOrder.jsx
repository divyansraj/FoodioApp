/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { myURL } from "../../utils/constants";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartValues, url } =
    useContext(StoreContext);
  const { totalAmount, totalCartItems } = getTotalCartValues();

  const token = useSelector((store) => store.auth.token);

  const [data, setDate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDate((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount,
    };

    let response= await axios.post(myURL+"/api/order/place",orderData,{headers: {token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  };

  return (
    <div className="pt-32 px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {totalCartItems > 0 ? (
          <>
            <form
              onSubmit={placeOrder}
              className="flex flex-col gap-6 w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md"
            >
              <h1 className="font-semibold text-3xl mb-4">
                Delivery Information
              </h1>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                  type="text"
                  placeholder="First name"
                  className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
                />
                <input
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
                  type="text"
                  placeholder="Last name"
                  className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
                />
              </div>
              <input
                required
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Email address"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <input
                required
                name="street"
                onChange={onChangeHandler}
                value={data.street}
                type="text"
                placeholder="Street"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  required
                  name="city"
                  onChange={onChangeHandler}
                  value={data.city}
                  type="text"
                  placeholder="City"
                  className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
                />
                <input
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={data.state}
                  type="text"
                  placeholder="State"
                  className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  required
                  name="zipCode"
                  onChange={onChangeHandler}
                  value={data.zipCode}
                  type="text"
                  placeholder="Zip code"
                  className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
                />
                <input
                  required
                  name="country"
                  onChange={onChangeHandler}
                  value={data.country}
                  type="text"
                  placeholder="Country"
                  className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
                />
              </div>
              <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="text"
                placeholder="Phone"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <button
                type="submit"
                className="text-center py-2 px-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
              >
                Proceed to Payment
              </button>
            </form>
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <h1 className="font-semibold text-3xl mb-4">Cart Totals</h1>
              <div>
                {food_list.map((item) => {
                  if (cartItems[item._id] > 0) {
                    return (
                      <div
                        key={item._id}
                        className="mb-4 p-2 bg-gray-50 rounded-lg shadow-sm"
                      >
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div className="col-span-1">
                            <img
                              src={item.image.secure_url}
                              className="w-24 h-24 object-cover rounded"
                              alt={item.name}
                            />
                          </div>
                          <div className="col-span-2">
                            <h1 className="text-lg font-semibold">
                              {item.name}
                            </h1>
                          </div>
                          <div className="col-span-1 text-right">
                            <h1 className="text-lg">${item.price}</h1>
                            <h1 className="text-lg">x{cartItems[item._id]}</h1>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                <hr></hr>
                <div className="flex justify-between">
                  <h1 className="font-bold text-lg">Total</h1>
                  <h1 className="font-bold text-lg">${totalAmount}</h1>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-xl font-semibold">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
