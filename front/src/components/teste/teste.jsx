import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductInfo, setSelectedProductInfo] = useState({});
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Função para buscar os produtos da API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost/api/product/get.php');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Função para preencher informações do produto ao selecionar da lista
  const handleProductSelect = (e) => {
    const productCode = e.target.value;
    setSelectedProduct(productCode);
    const selectedProduct = products.find(product => product.code === productCode);
    setSelectedProductInfo(selectedProduct);
  };

  // Função para adicionar um produto ao carrinho
  const addToCart = () => {
    const productToAdd = { ...selectedProductInfo, amount };
    setCart([...cart, productToAdd]);
    setAmount(0); // Limpa o campo de quantidade
  };

  // Função para calcular o total e o imposto do carrinho
  const calculateTotalAndTax = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
    const tax = cart.reduce((acc, item) => acc + item.tax * item.amount, 0);
    return { total, tax };
  };

  // Função para finalizar a compra
  const finishPurchase = async () => {
    try {
      // Enviar os dados do carrinho para a API de pedidos
      await axios.post('http://localhost/api/order/post.php', { cart });
      alert("Compra finalizada com sucesso!");
      setCart([]);
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert("Erro ao finalizar compra. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <select value={selectedProduct} onChange={handleProductSelect}>
        <option value="" disabled>Select the Product</option>
        {products.map(product => (
          <option key={product.code} value={product.code}>{product.name}</option>
        ))}
      </select>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={addToCart}>Add to Cart</button>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Total</th>
            <th>Category Code</th>
            <th>Total with Tax</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.code}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.amount}</td>
              <td>{product.amount * product.price}</td>
              <td>{product.category_code}</td>
              <td>{product.amount * product.price + parseFloat(product.tax)}</td>
              <td><button onClick={() => setCart(cart.filter(item => item.code !== product.code))}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Total Tax: {calculateTotalAndTax().tax}</p>
        <p>Total: {calculateTotalAndTax().total}</p>
      </div>

      <button onClick={finishPurchase}>Finish Purchase</button>
    </div>
  );
};

export default MyComponent;