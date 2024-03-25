import { useDispatch } from "react-redux";
import { deleteProductFromCart } from "../../rdx/cart/action";
import "/src/css/HomeStyle.css"


const HomeTable = ({ product }) => {
  const total = product.price * product.amount;

  const dispatch = useDispatch();

  const deleteProductButton = async (code) => {
    dispatch(deleteProductFromCart(code));
  };

  return (
    <>
      <tr key={product.code}>
        <td>{product.code}</td>
        <td>{product.name}</td>
        <td>{product.amount}</td>
        <td>{product.price}</td>
        <td>{product.categoryName}</td>
        <td>{total}</td>
        <td>
          <button className="buttonDelete" onClick={() => deleteProductButton(product.code)}>Delete</button>
        </td>
      </tr>
    </>
  );
};

export default HomeTable;