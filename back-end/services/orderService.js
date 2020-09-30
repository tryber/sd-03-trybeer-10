const orderModel = require('../models/orderModel');

const getOrderDetail = async (id) => await orderModel.getOrderDetail(id);

const getOrderById = async (id) => await orderModel.getOrderById(id);

module.exports = {
  getOrderDetail,
  getOrderById,
};
