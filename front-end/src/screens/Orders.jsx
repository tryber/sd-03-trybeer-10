import React from 'react';
import Header from '../components/Header';

function Orders() {

  return (
    <div>
      <Header title='Meus Pedidos' />
      <div data-testid="0-order-card-container">
        <p data-testid="0-order-number">Numero do pedido</p>
        <p data-testid="0-order-date">Data do pedido</p>
        <p data-testid="0-order-total-value">Valor do pedido</p>
      </div>
    </div>
  )
};

export default Orders;
