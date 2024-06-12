import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";

const List = () => {
  const myURL = "http://localhost:4000";
  const [list, setList] = useState([]);

  const items = async () => {
    try {
      const response = await axios.get(`${myURL}/api/food/allfooditems`);
      if (response.data.success) {
        setList(response.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };
  useEffect(() => {
    items();
  }, []);

  const removefooditem = async (foodId) => {
    try {
      const response = await axios.delete(`${myURL}/api/food/delete`, {
        data: { id: foodId }, 
      });
      await items();
      if (response.data.success) {
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  
console.log(list)
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white rounded-md shadow-md">
        <p className="font-semibold col-span-1">Name</p>
        <p className="font-semibold col-span-1">Description</p>
        <p className="font-semibold col-span-1">Price</p>
        <p className="font-semibold col-span-1">Category</p>
        <div className="font-semibold col-span-1 flex justify-end items-center">
          Action
        </div>
      </div>
      {list?.food?.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white rounded-md shadow-md mt-4 items-center"
        >
          <div className="col-span-1 flex flex-col">
            <img
              src={item.image.secure_url}
              alt="food-item"
              className="w-24 h-24 object-cover rounded-md"
            />
            <p className="mt-2 md:mt-0 md:ml-4">{item.name}</p>
          </div>
          <p className="col-span-1">{item.description}</p>
          <p className="col-span-1">{item.price}</p>
          <p className="col-span-1">{item.category}</p>
          <div className="col-span-1 flex justify-end items-center">
            <IoIosClose
              className="text-xl text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => removefooditem(item._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
