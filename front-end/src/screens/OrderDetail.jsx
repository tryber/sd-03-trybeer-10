import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

function OrderDetail(props) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [orderInfo, setOrderInfo] = useState();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!currentUser) return props.history.push('/login');
    const headers = new Headers({
      "Authorization": currentUser.token
    });

    fetch(`http://localhost:3001/orders/${props.match.params.id}`, { headers })
      .then((response) => response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setOrderInfo(data))
      .catch((_err) => setLoggedIn(false))
  }, [])

  if(!loggedIn) return <Redirect to="/login"/>

  const setTime = (date) => {
    const format = new Date(date);
    format.setHours(format.getHours() + 3)
    return format;
  }

  const dateFormat = { day: '2-digit', month: '2-digit' }
  
  return ( orderInfo ?
    <div>
      <Header title="Detalhes de Pedido"/>
      <h2 data-testid="order-number">Pedido {orderInfo.orderById.id}</h2>
      <h2 data-testid="order-date">{setTime(orderInfo.orderById.saleDate).toLocaleDateString('pt-BR', dateFormat)}</h2>
        {orderInfo.orderDetail.map(({ quantity, name, price }, index) =>
      <table>
        <tr>
          <td data-testid={`${index}-product-qtd`}>{quantity}</td>
        </tr>
        <tr>
          <td data-testid={`${index}-product-name`}>{name}</td>
        </tr>
        <tr>
          <td data-testid={`${index}-product-total-value`}>{`R$ ${(Math.round((price*quantity)*100)/100).toFixed(2).toString().replace('.', ',')}`}</td>
        </tr>
      </table>
        )
      }
      <h3 data-testid="order-total-value">Total {`R$ ${(Math.round((orderInfo.orderById.totalPrice)*100)/100).toFixed(2).toString().replace('.', ',')}`}</h3>
    </div>
    :
    <p>Carregando...</p>
  )
}

export default OrderDetail;
