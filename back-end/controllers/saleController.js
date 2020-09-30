const rescue = require('express-rescue');
const saleService = require('../services/saleService');

const registerNewSale = rescue(async (req, res) => {
  const { id } = req.user;
  const { address, price, number, products } = req.body;

  const saleId = await saleService.newSale(id, price, address, number, products);

  res.status(201).json({ saleId });
});

module.exports = {
  registerNewSale,
};
