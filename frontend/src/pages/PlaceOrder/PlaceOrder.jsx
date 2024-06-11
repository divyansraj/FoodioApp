/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const foodItems = useSelector((store) => store.menu.items);
  const totalPrice = useSelector((store) => store.menu.totalAmount);
  return (
    <div className="pt-32 px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <form className="flex flex-col gap-6 w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="font-semibold text-3xl mb-4">Delivery Information</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="First name"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
            />
            <input
              type="text"
              placeholder="Last name"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="text"
            placeholder="Street"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="City"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
            />
            <input
              type="text"
              placeholder="State"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Zip code"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
            />
            <input
              type="text"
              placeholder="Country"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </form>
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="font-semibold text-3xl mb-4">Cart Totals</h1>
          <div>
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 p-2 bg-gray-50 rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="col-span-1">
                    <img
                      src={item.image}
                      className="w-24 h-24 object-cover rounded"
                      alt={item.name}
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-lg font-semibold">{item.name}</h1>
                  </div>
                  <div className="col-span-1 text-right">
                    <h1 className="text-lg">${item.price}</h1>
                    <h1 className="text-lg">x{item.quantity}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr></hr>
          <div className="flex justify-between">
            <h1 className=" font-bold text-lg">Total</h1>
            <h1 className=" font-bold text-lg">${totalPrice}</h1>
          </div>
          <button
            className="flex justify-end py-2 px-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
