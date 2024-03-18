import "/src/css/HomeStyle.css"
import HomeForm from "../../components/home/HomeCompForm";

const HomeBody = () => {
    return(
        <div className="global">
            <div className="main">
                <HomeForm/>
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
                <form method="get" class="compra" id="compra">
                    <div class="form-carrinho">
                      <div class="tax">
                        <label for="Tax">Tax:</label>
                        <input type="text" className="inp" name="tax" id="final-tax" disabled/>
                      </div>
                      <div class="total">
                        <label for="Total">Total:</label>
                        <input type="text" className="inp" name="total" id="total" disabled/>
                      </div>

                      <div class="check">
                        <button className="submit" id="cancel">Cancel</button>
                        <button className="submit-finish" id="finish-button" onclick="cartToHistory()">Finish</button>
                      </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );

}

export default HomeBody;