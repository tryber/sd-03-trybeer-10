const orderModel = require('../models/orderModel');

const orderDetail = async (req, res) => {
  const { id } = req.params;
  const order = await orderModel.getOrderById(id);
  return res.status(200).json(order);
};

module.exports = {
  orderDetail,
};
