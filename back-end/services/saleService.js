const saleModel = require('../models/saleModel');

const newSale = async (uId, price, address, number, products) => {
  const date = new Date().toISOString()
    .slice(0, 10);
  const saleId = await saleModel.registerSale(uId, price, address, number, date);

  products.forEach(async (product) => {
    const { id, qty } = product;

    await saleModel.registerSaleProduct(saleId, id, qty);
  });

  return saleId;
};

module.exports = {
  newSale,
};
