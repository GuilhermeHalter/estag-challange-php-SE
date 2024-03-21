import HomeComp from '../../components/home/HomeCompForm';
import HomeTable from '../../components/home/HomeCompTable';
import TotalTaxIndex from '../../components/home/TotalTaxForm';
import FinishCancel from '../../components/home/FinishAndCancel';
import "/src/css/HomeStyle.css"

import { useState } from 'react';
import { useSelector } from 'react-redux';

const HomeBody = () => {
  const [cart, setCart] = useState([]);
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);
  console.table(products);

  return (
    <div className="global">
      <div className="main">
        <HomeComp setCart={setCart} cart={cart} />
        <div className="division">
          <hr className="division" />
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
              <th>Code</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Category</th>
              <th>Total</th>
              <th>Delete</th>
              </tr>
            </thead>
            <tbody>

              {products.map((product) => (
                <HomeTable key={product.code} product={product} setCart={setCart} cart={cart} />
              ))}
            </tbody>
          </table>
          <form id='compra' className='compra'>
              <TotalTaxIndex />
          
            <div className="check">
              <FinishCancel />
            </div>
            
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default HomeBody;