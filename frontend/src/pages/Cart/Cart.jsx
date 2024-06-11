import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItem as addToCart,
  removeItem as removeFromCart,
  clearCart,
} from "../../utils/FoodMenuSlice";

const Cart = () => {
  const cart = useSelector((store) => store.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="pt-[80px] px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        {cart.items.length > 0 ? (
          <>
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg mb-4 p-4"
              >
                <img
                  src={item.image}
                  alt="food-item"
                  className="w-full md:w-32 h-32 object-cover rounded-md mb-4 md:mb-0"
                />
                <div className="md:ml-4 flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">{item.description}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition duration-200"
                      onClick={() => addItemToCart(item)}
                    >
                      +
                    </button>
                    <span className="px-3 text-lg font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
                      onClick={() => removeItemFromCart(item._id)}
                    >
                      -
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-gray-700">
                      <h1 className="text-lg">${item.price}</h1>
                      <h1 className="text-lg">x{item.quantity}</h1>
                    </div>
                    <h1 className="text-lg font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6">
              <button
                onClick={handleClearCart}
                className="py-2 px-4 text-white font-semibold bg-red-500 rounded-md hover:bg-red-700 transition duration-200 mb-4 md:mb-0"
              >
                Clear Cart
              </button>
              <div className="text-center md:text-right">
                <h2 className="text-xl font-bold mb-2">
                  Total: ${cart.totalAmount.toFixed(2)}
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
