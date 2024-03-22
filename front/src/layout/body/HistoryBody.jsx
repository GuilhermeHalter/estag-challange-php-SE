import HistoryComp from '../../components/history/HistoryCompTable';
import { useState, useEffect } from "react";
import axios from "../../lib/axios";

const UrlOrder = import.meta.env.VITE_Api_UrlOrder;

const HistoryBody = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const { data } = await axios.get(`${UrlOrder}get.php`);
                setOrders(data);
            } catch (error) {
                console.log(error);
            }
        };
        getOrder();
    }, []);


    return (
        <div >
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Tax</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 &&
                        orders?.map((order) => (
                            <HistoryComp key={order.code} order={order} />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryBody;