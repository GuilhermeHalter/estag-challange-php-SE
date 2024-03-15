import "/src/css/CategoryStyle.css"

const CategoryBody = () => {
    return(
        <div className="global">
            <div className="formCenter">

            <div className="form">
                <input type="number" className="inp"/>
                <input type="text" className="inp"/>
                <input type="number" className="inp"/>
                <button className="submit">Add Category</button>

            </div>

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
    );

}

export default CategoryBody;