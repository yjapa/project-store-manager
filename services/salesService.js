const salesModel = require('../models/salesModel');

const createSale = async (data) => {
  const insertId = await salesModel.createSale(data);
  return insertId;
};

module.exports = {
  createSale,
};
