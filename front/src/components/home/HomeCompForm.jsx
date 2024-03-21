import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../rdx/cart/action";
import "/src/css/HomeStyle.css"

const UrlProduct = import.meta.env.VITE_Api_UrlProduct;

const HomeForm = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [tax, setTax] = useState("");
    const [name, setName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [price, setPrice] = useState("");

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

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${UrlProduct}get.php`);
                const data = res.data;
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);
    const dispatch = useDispatch();

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
                <select name="products" id="products" className="inp_select" required onChange={(e) => setProduct(e.target.value)}>
                    <option>Select a Product</option>
                    {products?.map((prod) => (
                        <option key={prod.code} value={prod.code}>
                            {prod.name}
                        </option>
                    ))}
                </select>

                <input
                    required
                    placeholder="Amount"
                    type="number"
                    name="amount"
                    min={1}
                    className="inp"
                    value={amount}
                    max={products.find((prod) => prod.code == product)?.amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                />

                <input
                    disabled
                    className="inp"
                    placeholder="Tax"
                    type="number"
                    name="tax"
                    value={tax}
                    onChange={(e) => {
                        setTax(e.target.value);
                    }}
                />

                <input
                    disabled
                    className="inp"
                    placeholder="Price"
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />
                <button className="submit" type="submit">
                    Add product
                </button>
            </form>
        </>
    );
};

export default HomeForm;