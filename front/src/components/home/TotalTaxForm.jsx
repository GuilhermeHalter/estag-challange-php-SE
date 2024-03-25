import { useSelector } from 'react-redux';
import { selectProductsTotalPrice, selectProductsTotalTax } from '../../rdx/cart/cart';
import "/src/css/HomeStyle.css"


const TotalTaxIndex = () => {
  const total = useSelector(selectProductsTotalPrice);
  const tax = useSelector(selectProductsTotalTax);

  return (
    <>
      <div className="tax">
        <label className='label'>Tax:</label>
        <input disabled type='number' className="inp-taxTotal" name='tax' id='final-tax' placeholder={tax} />
      </div>

      <div className="total">
        <label className='label'>Total:</label>
        <input disabled type='number' className="inp-taxTotal" name='total' id='total' placeholder={total} />
      </div>
    </>
  );
};
export default TotalTaxIndex;