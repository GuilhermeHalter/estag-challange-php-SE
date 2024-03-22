import { Link } from 'react-router-dom';

const HistoryComp = ({ order }) => {
  return (
    <tr>
      <td>{order.code}</td>
      <td>{order.tax}</td>
      <td>{order.total}</td>
      <td>
        <Link to={`/viewItem/${order.code}`}>Details</Link>
      </td>
    </tr>
  );
};

export default HistoryComp;