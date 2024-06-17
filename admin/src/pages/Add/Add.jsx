import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { myURL } from "../../utils/constant";

const Add = () => {
  //const myURL = "http://localhost:4000";
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Automatically handles file inputs and encodes the data in a format suitable for multipart/form-data.
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(myURL+"/api/food/add", formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <form
        className="flex flex-col gap-6 max-w-2xl mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-lg font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
            <label
              htmlFor="image"
              className="cursor-pointer flex justify-center items-center border-2 border-dashed border-gray-400 p-4 rounded-md"
            >
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload"
                className="w-24"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Product Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={data.name}
            placeholder="Type here"
            className="border-2 border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">
            Product Description
          </label>
          <textarea
            name="description"
            placeholder="Type here"
            onChange={handleChange}
            value={data.description}
            rows="4"
            className="border-2 border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-lg font-semibold mb-2">
              Product Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              value={data.category}
              className="border-2 border-gray-300 p-2 rounded-md"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-lg font-semibold mb-2">Product Price</label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              value={data.price}
              placeholder="$20"
              className="border-2 border-gray-300 p-2 rounded-md"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
