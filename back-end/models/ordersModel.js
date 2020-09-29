const connection = require('./connection');

const fetchOrders = async () => {
  const db = await connection();

  const fetch = await db.getTable('sales').select(['id', 'total_price', 'sale_date'])
    .orderBy('id')
    .execute();

  const recipes = fetch.fetchAll();

  return recipes.map(([id, totalPrice, saleDate]) => (
    { id, totalPrice, saleDate }
  ));
};

module.exports = {
  fetchOrders,
};
