const orderModel = require('../models/orderModel');

const getOrderDetail = async (id) => orderModel.getOrderDetail(id);

module.exports = {
  getOrderDetail,
}