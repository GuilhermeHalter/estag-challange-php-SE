import "/src/css/ProductStyle.css"

const ProductBody = () => {
    return(
        <div className="global">
            <div className="main">

            <div className="form">
                <input type="text" className="inp" placeholder="Product name"/>
                <input type="number" className="inp" placeholder="Price"/>
                <select name="category" className="inp_select"></select>
                <input type="number" className="inp" placeholder="Amount"/>
                <button className="submit">Add Product</button>

            </div>

            
            <div className="division">
              <hr className="division"/>  
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>olha</th>
                            <th>olha</th>
                            <th>olha</th>
                            <th>olha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>olha</td>
                            <td>olha</td>
                            <td>olha</td>
                            <td>olha</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );

}

export default ProductBody;