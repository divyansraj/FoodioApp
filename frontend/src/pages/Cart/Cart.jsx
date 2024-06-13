import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    clearCart,
    getTotalCartValues,
  } = useContext(StoreContext);

  const { totalAmount, totalCartItems } = getTotalCartValues();

  return (
    <div className="pt-[80px] px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        {totalCartItems > 0 ? (
          <>
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg mb-4 p-4"
                  >
                    <img
                      src={item.image.secure_url}
                      alt="food-item"
                      className="w-full md:w-32 h-32 object-cover rounded-md mb-4 md:mb-0"
                    />
                    <div className="md:ml-4 flex-1">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-500">{item.description}</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
                          onClick={() => removeFromCart(item._id)}
                        >
                          -
                        </button>

                        <span className="px-3 text-lg font-semibold text-gray-800">
                          {cartItems[item._id]}
                        </span>

                        <button
                          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition duration-200"
                          onClick={() => addToCart(item._id)}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-gray-700">
                          <h1 className="text-lg">${item.price}</h1>
                          <h1 className="text-lg">x{cartItems[item._id]}</h1>
                        </div>
                        <h1 className="text-lg font-semibold">
                          ${item.price * cartItems[item._id]}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6">
              <button
                onClick={() => clearCart()}
                className="py-2 px-4 text-white font-semibold bg-red-500 rounded-md hover:bg-red-700 transition duration-200 mb-4 md:mb-0"
              >
                Clear Cart
              </button>
              <div className="text-center md:text-right">
                <h2 className="text-xl font-bold mb-2">
                  Total: $ {totalAmount}
                </h2>
                <button
                  onClick={() => navigate("/order")}
                  className="py-2 px-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                >
                  Proceed to Checkout
                </button>
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

export default Cart;
