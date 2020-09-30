const rescue = require('express-rescue');
const ordersModel = require('../models/ordersModel');

const listAllOrders = rescue(async (req, res) => {
  const ordersList = await ordersModel.fetchOrders();

  return res.status(200).json(ordersList);
});

module.exports = {
  listAllOrders,
};
