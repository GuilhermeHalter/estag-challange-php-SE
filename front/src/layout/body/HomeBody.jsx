import "/src/css/HomeStyle.css"

const HomeBody = () => {
    return(
        <div className="global">
            <div className="main">

            <div className="form">
                <select name="category" className="inp_select"></select>
                <input type="text" className="inp" placeholder="Amount"/>
                <input type="number" className="inp" placeholder="Tax"/>
                <input type="number" className="inp" placeholder="Price"/>
                <button className="submit">Add in Cart</button>

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
                            <th>olha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>olha</td>
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

export default HomeBody;