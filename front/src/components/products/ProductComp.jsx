import { useState, useEffect } from "react";
import "/src/components/products/ProductComp.css"
import axios from "axios";

const ApiUrl = import.meta.env.VITE_Api_UrlProduct;

const ProductComp = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try{
            const response = await axios.get(
                `${ApiUrl}get.php`
            );
            const data = response.data
            setProducts(data)
            console.log(data)
        }catch(error){
            console.error("Error fetching data:", error);
        }
    };

    function deleteProduct(code){
        axios.delete(`${ApiUrl}delete.php?code=${code}`)
        setProducts(products.filter(produtos => produtos.code !== code))
    };

    useEffect(()=>{
        getProducts();
    }, []);

    return (
        <>
            {products.length === 0 ? (
                <tbody><tr><td>Carregando...</td></tr></tbody>
            ):(
                <tbody>
                {products?.map((produtos) => (
                            <tr key={produtos.code}>
                                
                                    <td>{produtos.code}</td>
                                    <td>{produtos.name}</td>
                                    <td>{produtos.price}</td>
                                    <td>{produtos.category_code}</td>
                                    <td>{produtos.amount}</td>   
                                    <td><button  className="buttonDelete"  onClick={() => deleteProduct(produtos.code)}>Delete</button></td>
                            </tr>  
                ))}
                </tbody>
            )}
        </>
    )
}

export default ProductComp