import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { myURL } from "../utils/constants";
import { useSelector } from "react-redux";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const token = useSelector((store) => store.auth.token);

  const loadData = async () => {
    await fetchFoodList();
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      await loadCartItems(localStorageToken);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(myURL + "/api/cart/add",{ itemId: itemId },{ headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(myURL + "/api/cart/delete",{ itemId: itemId },{ headers: { token } });
    }
  };

  const clearCart = async() => {
    setCartItems({});
    if(token) {
      await axios.post(myURL + "/api/cart/clearcart",{},{ headers: {token}});
    }
  };

  const getTotalCartValues = () => {
    let totalAmount = 0;
    let totalCartItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
        totalCartItems += cartItems[item];
      }
    }
    return { totalAmount, totalCartItems };
  };

  const fetchFoodList = async () => {
    const response = await axios.get(myURL + "/api/food/allfooditems");
    setFoodList(response.data.food);
  };

  const loadCartItems = async (token) => {
    const response = await axios.post(myURL + "/api/cart/items",{},{ headers: { token } });
    setCartItems(response.data.cartData);
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartValues,
    fetchFoodList,
    loadCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
