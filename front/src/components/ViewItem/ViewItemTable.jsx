import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import ViewItemComp from './ViewItemCompTable';

const UrlProduct = import.meta.env.VITE_Api_UrlProduct;

const TableDetails = ({ orderItems }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${UrlProduct}get.php`);

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Product Code</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Tax</th>
        </tr>
      </thead>

      <tbody>
        {orderItems?.map((order) => (
          <ViewItemComp
            key={order.code}
            order={order}
            product={products.find((product) => product.code == order.product_code)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableDetails;