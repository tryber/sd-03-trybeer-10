const orderService = require('../services/orderService');

const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const orderDetail = await orderService.getOrderDetail(id);
  const orderById = await orderService.getOrderById(id);
  return res.status(200).json(orderDetail, orderById);
};

module.exports = {
  getOrderDetail,
};
