/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";
import { myURL } from "../utils/constants";

export const StoreContext = createContext(null)

const StoreContextProvider =(props) => {

    const [cartItems,setCartItems] = useState({});
    const [food_list,setFoodList] = useState([]);

    const addToCart =(itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    };

    const clearCart = ()=> {
        setCartItems({});
    }

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

    const fetchFoodList=async()=> {
      const response = await axios.get(myURL + "/api/food/allfooditems");
      setFoodList(response.data.food);
    }
    

    const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalCartValues,
      fetchFoodList,
    };
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;