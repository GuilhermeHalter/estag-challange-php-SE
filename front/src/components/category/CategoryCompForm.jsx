import { useState } from "react";
import axios from "../../lib/axios";

import "/src/css/CategoryStyle.css"

const ApiUrl = import.meta.env.VITE_Api_UrlCategory;


const CategoryForm = () => {
    const [name, setName] = useState('');
    const [tax, setTax] = useState('');

    const CategoryPost = async (e) => {
        e.preventDefault();
        let categoryForm = new FormData();
        const data = {
            name: name,
            tax: tax
        };

        categoryForm.append('name', name);
        categoryForm.append('tax', tax);

        try {
            const response = await axios.post(`${ApiUrl}post.php`, categoryForm);
        } catch (error) {
            console.log(error);
        }

    };

    const submitPost = (e) => {
        e.preventDefault();
        CategoryPost(e);
        e.target.reset();
    }



    return (
        <>
            <form className="form" onSubmit={submitPost}>
                <input type="text" className="inp" name="name" id="name" placeholder="Category name" onChange={(e) => { setName(e.target.value); }} />
                <input type="number" className="inp" name="tax" id="tax" placeholder="Tax" onChange={(e) => { setTax(e.target.value); }} />
                <button type="submit" className="submit">Add Category</button>
            </form>
        </>
    )
}

export default CategoryForm