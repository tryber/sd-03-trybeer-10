const connection = require('./connection');

const getOrderById = async (Id) =>
  connection()
    .then((db) =>
      db
        .getTable('sales')
        .select(['id', 'user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
        .where('id = :id')
        .bind('id', Id)
        .execute(),
    )
    .then((results) => results.fetchAll()[0] || [])
    .then(([id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status]) => id ?
    ({ id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status }) : null)
    .catch((err) => { console.error(err); });

const getQuantityByOrderId = async (Id) =>
connection()
  .then((db) =>
    db
      .getTable('sales_products')
      .select(['sale_id', 'product_id', 'quantity'])
      .where('sale_id = :id')
      .bind('id', Id)
      .execute(),
  )
  .then((results) => results.fetchAll()[0] || [])
  .then(([saleId, productId, quantity]) => saleId ? ({ saleId, productId, quantity }) : null)
  .catch((err) => { console.error(err); });

module.exports = {
  getOrderById,
  getQuantityByOrderId,
};
