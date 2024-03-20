import "/src/css/HomeStyle.css"
import { useSelector } from "react-redux";

import HomeForm from "../../components/home/HomeCompForm";
import HomeComp from "../../components/home/HomeCompTable";



const HomeBody = () => {
    const { products } = useSelector((rootReducer) => rootReducer.cartReducer);
    console.table(products);


    return (
        <div className="global">
            <div className="main">
                <HomeForm />
                <div className="division">
                    <hr className="division" />
                </div>
                <div className="table">
                    <table >
                        <thead>
                            <tr>
                                <th>olha</th>
                                <th>olha</th>
                                <th>olha</th>
                                <th>olha</th>
                                <th>olha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <HomeComp key={product.code}  />
                            ))}
                        </tbody>
                    </table>
                    <form method="get" className="compra" id="compra">
                        <div className="form-carrinho">
                            <div className="tax">
                                <label className="Tax">Tax:</label>
                                <input type="number" className="inp" name="tax" id="final-tax" disabled />
                            </div>
                            <div className="total">
                                <label className="Total">Total:</label>
                                <input type="number" className="inp" name="total" id="total" disabled />
                            </div>

                            <div className="check">
                                <button className="submit" id="cancel">Cancel</button>
                                <button className="submit-finish" id="finish-button">Finish</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default HomeBody;