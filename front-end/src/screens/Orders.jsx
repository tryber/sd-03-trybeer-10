import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';

function Orders() {
  const [ordersList, setOrdersList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const headers = new Headers({
      "Authorization": currentUser.token
    });

    fetch('http://localhost:3001/orders', { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setOrdersList(data))
      .catch((_err) => setLoggedIn(false))
  }, [])

  if (!loggedIn) return <Redirect to="/login" />

  return (
    <div>
      <Header title='Meus Pedidos' />
      <Link to='/orders/:id'>
        {ordersList.map((order, index) => (
          <div data-testid={`${index}-order-card-container`}>
            <p data-testid={`${index}-order-number`}>Pedido {order.delivery_number}</p>
            <p data-testid={`${index}-order-date`}>{order.sale_date}</p>
            <p data-testid={`${index}-order-total-value`}>{order.total_price}</p>
          </div>
        ))}
      </Link>
    </div>
  )
};

export default Orders;
