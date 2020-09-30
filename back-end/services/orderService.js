const orderModel = require('../models/orderModel');

const getOrderDetail = async (id) => orderModel.getOrderDetail(id);

const getOrderById = async (id) => orderModel.getOrderById(id);

module.exports = {
  getOrderDetail,
  getOrderById,
};
