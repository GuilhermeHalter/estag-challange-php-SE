import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/components/category/CategoryComp.css"
import axios from "axios";

const ApiUrl = import.meta.env.VITE_Api_UrlCategory;

const CategoryComp = () =>{

    const [category, setCategory] = useState([]);

    const getCategories = async () => {
        try{
            const response = await axios.get (
                `${ApiUrl}get.php`
            );
            const data = response.data
            setCategory(data)
            console.log(data)
        }catch(error){
            console.error("Error fetching data:", error);
        }
    };

    function deleteCategory(code){
        axios.delete(`${ApiUrl}delete.php?code=${code}`)
        setCategory(category.filter(categoria => categoria.code !== code))
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            {category.length === 0 ? (
                <tbody><tr><td>Carregando...</td></tr></tbody>
            ) : (
                <tbody>
                {category?.map((categoria) => (
                            <tr key={categoria.code}>
                                
                                    <td>{categoria.code}</td>
                                    <td>{categoria.name}</td>
                                    <td>{categoria.tax}</td> 
                                    <td><button  className="buttonDelete"  onClick={() => deleteCategory(categoria.code)}>Delete</button></td>
                            </tr>  
                ))}
                </tbody>
            )}
        </>
    )
} 
export default CategoryComp;