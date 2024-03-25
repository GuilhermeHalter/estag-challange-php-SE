import { useEffect, useState } from "react";
import TableDetails from "../../components/ViewItem/TableDatails";
import axios from "axios";
import "../../css/ViewItemStyle.css";

const UrlOrder = import.meta.env.VITE_Api_UrlOrder;
const UrlOrderItem = import.meta.env.VITE_Api_UrlOrderItem;

import { useParams } from "react-router-dom";

const ViewDetails = () => {
  const { code } = useParams();

  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${UrlOrder}get.php`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderItems = async () => {
    try {
      const { data } = await axios.get(`${UrlOrderItem}get.php`);
      const items = data.filter((item) => item.order_code == code);

      setOrderItems(items);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrder = async () => {
    const orders = await getAllOrders();

    const order = orders.find((order) => order.code == code);

    setOrder(order);
  };

  useEffect(() => {
    getOrderItems();
    getOrder();
  }, [code]);
  console.log(order);

  return (
    <div className="main">
    
    <div className="table">
      <TableDetails orderItems={orderItems} />
    </div>
         
     

      <div className="total-info">
        <h3 className="tax-paid">Taxes you paid: {order.tax}</h3>

        <h1 className="total">Total: {order.total}</h1>
      </div>
    </div>
  );
};

export default ViewDetails;