import "/src/css/CategoryStyle.css"

const CategoryBody = () => {
    return(
        <div className="global">
            <div className="main">

            <div className="form">
                <input type="number" className="inp" placeholder="Code"/>
                <input type="text" className="inp" placeholder="Category name"/>
                <input type="number" className="inp" placeholder="Tax"/>
                <button className="submit">Add Category</button>

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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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

export default CategoryBody;