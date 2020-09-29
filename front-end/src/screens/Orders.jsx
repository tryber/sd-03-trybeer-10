import React, { useState } from 'react';
import Header from '../components/Header';

function Orders() {

  return (
    <div>
      <Header title='Meus Pedidos' />
      {/* {orders.map((order, index) => (
        <div data-testid={`${index}-order-card-container`}>
          <p data-testid={`${index}-order-number`}>{order.delivery_number}</p>
          <p data-testid={`${index}-order-date`}>{order.sale_date}</p>
          <p data-testid={`${index}-order-total-value`}>{order.total_price}</p>
        </div>
      ))
      } */}
    </div>
  )
};

export default Orders;
