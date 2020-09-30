import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

function OrderDetail(props) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [orderDetail, setOrderDetail] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!currentUser) return props.history.push('/login');
    const headers = new Headers({
      "Authorization": currentUser.token
    });

    fetch(`http://localhost:3001/orders/${orderDetail.saleid}`, { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setOrderDetail(data))
      .catch((_err) => setLoggedIn(false))
  }, [])

  if(!loggedIn) return <Redirect to="/login"/>

  // const setTime = (date) => {
  //   const format = new Date(date);
  //   format.setHours(format.getHours() + 3)
  //   return format;
  // }

  // const dateFormat = { day: '2-digit', month: '2-digit' }
  
  return (
    <div>
      <Header title="Detalhes de Pedido"/>
      <h2 data-testid="order-number">Pedido {orderDetail.id}</h2>
      <h2 data-testid="order-date">{orderDetail.saleDate}</h2>
        {orderDetail.map(({ quantity, name, price }, index) =>
      <table>
        <tr>
          <td data-testid={`${index}-product-qtd`}>{quantity}</td>
        </tr>
        <tr>
          <td data-testid={`${index}-product-name`}>{name}</td>
        </tr>
        <tr>
          <td data-testid={`${index}-product-total-value`}>{price*quantity}</td>
        </tr>
      </table>
        )
      }
      <h3 data-testid="order-total-value">Total {orderDetail.totalPrice}</h3>
    </div>
  )
}

export default OrderDetail;
