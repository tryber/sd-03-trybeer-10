const connection = require('./connection');

const registerSale = async (userId, price, address, number, date, satus = 'Pendente') => {
  const db = await connection();

  return db
    .getTable('sales')
    .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .values(userId, price, address, number, date, satus)
    .execute()
    .then((result) => result.getAutoIncrementValue());
};

const registerSaleProduct = async (saleId, productId, qty) => {
  const db = await connection();

  return db
    .getTable('sales_products')
    .insert(['sale_id', 'product_id', 'quantity'])
    .values(saleId, productId, qty)
    .execute();
};

module.exports = {
  registerSale,
  registerSaleProduct,
};
