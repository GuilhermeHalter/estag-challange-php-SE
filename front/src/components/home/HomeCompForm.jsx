import { useEffect, useState } from "react";
import axios from "axios";

const UrlProduct = import.meta.env.VITE_Api_UrlProduct;

const HomeForm = () =>{
    const [product, setProducts] = useState(); 

    useEffect(() => {
        const getProducts = async()=>{
            try{
                const responses = await axios.get(
                    `${UrlProduct}get.php`
                );
                const data = responses;
                setProducts(data.data);
            }catch(error){
                console.log(error);
            }
        }
        getProducts();
    },[]);
    
    return(
        <>
            <form className="form">
                <select name="product" className="inp_select">
                <option hidden>Select Category</option>
                    {product?.map((produto) => (
                      <option key={produto.code} value={produto.code}>
                        {produto.name}
                      </option>
                    ))}
                </select>
                <input type="text" className="inp" placeholder="Amount"/>
                <input type="number" className="inp" placeholder="Tax"/>
                <input type="number" className="inp" placeholder="Price"/>
                <button className="submit">Add in Cart</button>

            </form>
        </>
    )
}

export default HomeForm