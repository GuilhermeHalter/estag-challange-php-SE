import "/src/css/ProductStyle.css"
import ProductComp from "../../components/products/ProductComp";
import ProductForm from "../../components/products/ProductCompForm";

const ProductBody = () => {
    return(
        <div className="global">
            <div className="main">
            <ProductForm />
            <div className="division">
              <hr className="division"/>  
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category code</th>
                            <th>Amount</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                        <ProductComp />
                </table>
            </div>
            </div>
        </div>
    );

}

export default ProductBody;