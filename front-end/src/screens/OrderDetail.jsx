import React from 'react';
import Header from '../components/Header';

function OrderDetail() {
  return (
    <div>
      <Header title="Detalhes de Pedido"/>
      <h2 data-testid="order-number">Pedido no.</h2>
      <h2 data-testid="order-date">Data</h2>
      <table>
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
