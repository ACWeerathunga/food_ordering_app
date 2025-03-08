import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value; // Get the selected status
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status,
      });

      if (response.data.success) {
        await fetchAllOrders(); // Refresh the order list
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />

            <p className='order-item-food'>
              {order.items.map((item, idx) => (
                <span key={idx}>
                  {item.name} X {item.quantity}
                  {idx !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>

            <p className="order-item-name">
              {order.address.firstName} {order.address.lastName}
            </p>

            <div className="order-item-address">
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
              </p>
            </div>

            <p className='order-item-phone'>{order.address.phone}</p>
            <p>Items: {order.items.length}</p>
            <p>Rs. {order.amount}</p>

            <select 
              onChange={(event) => statusHandler(event, order._id)} // Passing order._id correctly
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
