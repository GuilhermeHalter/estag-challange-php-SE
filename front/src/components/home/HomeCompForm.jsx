import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "/src/rdx/cart/action";


const UrlProduct = import.meta.env.VITE_Api_UrlProduct;

const HomeForm = () => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [tax, setTax] = useState("");
    const [name, setName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [price, setPrice] = useState("");


    useEffect(() => {
        const getProducts = async () => {
            try {
                const responses = await axios.get(
                    `${UrlProduct}get.php`
                );
                const data = responses;
                setProducts(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, []);

      const dispatch = useDispatch();



    const clearFormAfterSubmit = () => {
        setTax("");
        setPrice("");
        setAmount("");
    };

    async function changeTaxPrice() {
        const teste = products.find((prod) => prod.code == product);
        if (teste) {
            setTax(teste.tax);
            setPrice(teste.price);
            setName(teste.name);
            setCategoryName(teste.categoryname);
        }
    }
    useEffect(() => {
        changeTaxPrice();
    }, [product]);

    const handleProductClick = () => {
        dispatch(
            addProductToCart({
                code: product,
                name: name,
                amount: amount,
                tax: tax,
                price: price,
                categoryName: categoryName,
            })
        );
    };
    const addFinalProduct = (e) => {
        e.preventDefault();
        handleProductClick();
        clearFormAfterSubmit();
        e.target.reset();
    };

    return (
        <>
            <form className="form" onSubmit={addFinalProduct}>
                <select name="product" className="inp_select" onChange={(e) => setProduct(e.target.value)}>
                    <option hidden>Select Product</option>
                    {products?.map((produto) => (
                        <option key={produto.code} value={produto.code}>
                            {produto.name}
                        </option>
                    ))}
                </select>
                <input type="number" 
                    className="inp" 
                    placeholder="Amount"
                    name="amount"
                    id="amount" 
                    min={1} value={amount} 
                    max={products.find((prod) => prod.code == product)?.amount}
                    onChange={(e) => {setAmount(e.target.value);}} 
                />
                <input 
                    className="inp" 
                    id="tax" 
                    name="tax"
                    placeholder="Tax" 
                    value={tax}
                    onChange={(e) => {setTax(e.target.value);}} 
                />
                <input 
                    className="inp"
                    id="price"
                    name="price" 
                    placeholder="Price" 
                    value={price}
                    onChange={(e) => {setPrice(e.target.value);}} 
                />
                <button type="submit" className="submit">Add in Cart</button>

            </form>
        </>
    )
}

export default HomeForm