const connection = require('./connection');

const fetchOrders = async () => {
  const db = await connection();

  const fetch = await db.getTable('sales').select(['id', 'total_price', 'delivery_number', 'sale_date'])
    .orderBy('id').execute();

  const recipes = fetch.fetchAll();

  return recipes.map(([id, total_price, delivery_number, sale_date]) => ({ id, total_price, delivery_number, sale_date }));
};

module.exports = {
  fetchOrders,
};