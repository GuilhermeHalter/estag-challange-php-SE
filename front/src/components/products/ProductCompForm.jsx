import { useEffect, useState } from "react";
import axios from "../../lib/axios";

import "/src/css/ProductStyle.css"

const ApiUrl = import.meta.env.VITE_Api_UrlProduct;
const UrlCategory = import.meta.env.VITE_Api_UrlCategory;

const ProductForm = () => {
    const [category, setCategories] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category_code, setCategory_code] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const getCategory = async () => {
            try {
                const responses = await axios.get(
                    `${UrlCategory}get.php`
                );
                const data = responses;
                setCategories(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    }, []);



    const ProductPost = async (e) => {
        e.preventDefault();
        let productForm = new FormData();
        const data = {
            name: name,
            price: price,
            category_code: category_code,
            amount: amount,
        };

        productForm.append('name', name);
        productForm.append('price', price);
        productForm.append('category_code', category_code);
        productForm.append('amount', amount);

        try {
            const response = await axios.post(`${ApiUrl}post.php`, productForm);
        } catch (error) {
            console.log(error);
        }

    };

    const submitPost = (e) => {
        e.preventDefault();
        ProductPost(e);
        e.target.reset();
    }

    return (
        <>
            <form className="form" onSubmit={submitPost}>
                <input type="text" className="inp" name="name" id="name" placeholder="Product name" onChange={(e) => { setName(e.target.value); }} />
                <input type="number" className="inp" name="price" id="price" placeholder="Price" onChange={(e) => { setPrice(e.target.value); }} />
                <select name="category_code" id="category_code" className="inp_select" onChange={(e) => { setCategory_code(e.target.value); }}>
                    <option hidden>Select Category</option>
                    {category?.map((category) => (
                        <option key={category.code} value={category.code}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input type="number" className="inp" name="amount" id="amount" placeholder="Amount" onChange={(e) => { setAmount(e.target.value); }} />
                <button className="submit">Add Product</button>
            </form>

        </>
    )

}

export default ProductForm