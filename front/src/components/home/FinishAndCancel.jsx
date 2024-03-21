import axios from "axios";
import {
  selectProductsTotalPrice,
  selectProductsTotalTax,
} from "../../rdx/cart/cart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cancelCart } from "../../rdx/cart/action";
import "/src/css/HomeStyle.css"


const UrlProduct = import.meta.env.VITE_Api_UrlProduct;
const UrlOrder = import.meta.env.VITE_Api_UrlOrder;
const UrlOrderItem = import.meta.env.VITE_Api_UrlOrderItem;


const FinishCancel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const {data} = await axios.get(`${UrlProduct}get.php`);
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, []);

  const { products: cart } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );

  const productsTotalPrice = useSelector(selectProductsTotalPrice);
  const productsTotalTax = useSelector(selectProductsTotalTax);

  const onFinishPurchase = async (e) => {
    e.preventDefault();
    try {
      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }
    } catch (error) {
      console.log(error);
    }

    const order = new FormData();

    order.append("products", products);
    order.append("total", productsTotalPrice);
    order.append("tax", productsTotalTax);

    try {
      const res = await axios.post(`${UrlOrder}post.php`, order);
      console.log(res);

      for (const item of cart) {
        const product = products.find((product) => product.code == item.code);

        if (item.amount <= product.amount) {
          product.amount -= item.amount;
          await axios.put(
            `${UrlProduct}put.php?code=${product.code}`
          );
        } else {
          alert(`Product ${product.name} has only ${product.amount} in stock`);
          return;
        }
      }

      cart.forEach(async (item) => {
        let form = new FormData();
        form.append("order_code", res.data.code);
        form.append("product_code", item.code);
        form.append("amount", parseInt(item.amount));
        form.append("price", parseFloat(item.price) * parseInt(item.amount));
        form.append("tax", parseFloat(item.tax) * parseInt(item.amount));
        
        await axios.post(`${UrlOrderItem}post.php`, form);
        
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(cancelCart());
  };

  const dispatch = useDispatch();
  const cancelPurchase = () => {
    dispatch(cancelCart());
  };

  return (
    <>
        <button className="submit" id="cancel" onClick={cancelPurchase}>
          Cancel
        </button>
        <button
          className="submit-finish"
          id="finish-button"
          onClick={onFinishPurchase}
        >
          Finish
        </button>
    </>
  );
};
export default FinishCancel;