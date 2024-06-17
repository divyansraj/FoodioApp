import axios from "axios";
import { myURL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const MyOrders = () => {
  const token = useSelector((store) => store.auth.token);
  const [orderList, setOrderList] = useState([]);

  const myOrderList = async () => {
    const response = await axios.post(
      myURL + "/api/order/myorders",
      {},
      { headers: { token } }
    );
    setOrderList(response.data.order);
    console.log(response.data.order);
  };
  const refreshStatus= ()=> {
    myOrderList();
  }

  useEffect(() => {
    if (token) myOrderList();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy h:mm a");
  };

  return (
    <div className="pt-32 px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto ">
        {token ? (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
            <div className="flex flex-col gap-10">
              {orderList.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-300 rounded-lg p-4 shadow-lg bg-white"
                >
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Order Placed: {formatDate(item.date)}
                    </h2>
                  </div>
                  {item.items.map((each) => (
                    <div
                      key={each._id}
                      className="flex flex-col md:flex-row items-center gap-4 mb-4"
                    >
                      <img
                        src={each.image.secure_url}
                        className="w-20 h-20 object-cover rounded-md"
                        alt={each.name}
                      />
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold">{each.name}</h2>
                        <p className="text-gray-700">
                          ${each.price} x {each.quantity} = $
                          {each.price * each.quantity}
                        </p>
                        <p className="text-gray-600">{each.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                    <div className="text-gray-700">
                      <h3 className="text-lg font-medium">
                        Delivery Information
                      </h3>
                      <p>
                        Name: {item.address.firstName} {item.address.lastName}
                      </p>
                      <p>Email: {item.address.email}</p>
                      <p>Phone: {item.address.phone}</p>
                      <p>
                        Address: {item.address.street}, {item.address.city},{" "}
                        {item.address.state} {item.address.zipCode}
                      </p>
                    </div>
                    {item.payment ? (
                      <div className="flex flex-col gap-5 mt-4 md:mt-0">
                        <h3 className="text-lg font-medium text-gray-700">
                          Order Status
                        </h3>
                        <p className="text-indigo-600">{item.status}</p>
                        <div>
                          {item.status == "Delivered" ? (
                            <></>
                          ) : (
                            <button
                              onClick={refreshStatus}
                              className="p-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-700 transition duration-200"
                            >
                              Track Order
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <h3 className="text-lg font-medium text-gray-700">
                      Total Quantity: {item.items.length} Total Amount: $
                      {item.amount}
                    </h3>
                    {item.payment ? (
                      <h3 className="text-lg font-medium text-gray-700">
                        Total Paid: ${item.amount}
                      </h3>
                    ) : (
                      <h3 className="text-lg font-medium text-gray-700">
                        Payment Failed
                      </h3>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>Login to see your Orders</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
