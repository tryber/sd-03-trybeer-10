import React, { useState } from 'react';
import Header from '../components/Header';

function OrderDetail(props) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    if (!currentUser) return props.history.push('/login');
    const headers = new Headers({
      "Authorization": currentUser.token
    });

    fetch(`http://localhost:3001/orders/${saleid}`, { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setOrderDetail(data))
      .catch((_err) => setLoggedIn(false))
  }, [])

  if(!loggedIn) return <Redirect to="/login"/>

  const setTime = (date) => {
    const format = new Date(date);
    format.setHours(format.getHours() + 3)
    return format;
  }

  const dateFormat = { day: '2-digit', month: '2-digit' }
  
  return (
    <div>
      <Header title="Detalhes de Pedido"/>
      <h2 data-testid="order-number">Pedido no.</h2>
      <h2 data-testid="order-date">Data</h2>
      <table>
        {mapProductData(data)}
        <tr>
          <td data-testid="0-product-qtd">Qtde</td>
        </tr>
        <tr>
          <td data-testid="0-product-name">Nome do produto</td>
        </tr>
        <tr>
          <td data-testid="0-product-total-value">Valor total do produto</td>
        </tr>
      </table>
      <h3 data-testid="order-total-value">Total do pedido</h3>
    </div>
  )
}

export default OrderDetail;
