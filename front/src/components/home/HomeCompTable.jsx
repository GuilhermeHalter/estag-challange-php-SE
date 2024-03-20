import { useDispatch } from "react-redux";
import { deleteProductFromCart } from "/src/rdx/cart/action"
import { useState } from "react";

const HomeComp = (product) => {

    const [cart, setCart] = useState([]);

    function deleteCart(code) {
        setCart(cart.filter(product => product.code !== code))
    };

    const total = (product.price * product.amount).toFixed(2);


    return (
        <>
            {cart.length === 0 ? (
                <tr><td>Carregando...</td></tr>
            ) : (
                <tbody>
                    {cart?.map((product) => (
                        <tr key={product.code}>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.amount}</td>
                            <td>{product.price}</td>
                            <td>{product.categoryName}</td>
                            <td>{total}</td>
                            <td>
                                <button onClick={() => deleteCart(product.code)} >Delete</button>
                            </td>
                        </tr>
                        ))}
                </tbody>


            )}

        </>
    )
}

export default HomeComp