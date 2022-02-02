const salesModel = require('../models/salesModel');

const createSale = async (data) => {
  const insertId = await salesModel.createSale(data);
  return insertId;
};

const getAllSales = async () => {
  const sales = salesModel.getAllSales();
  return sales;
};

const getAllSalesById = async (id) => {
  const salesById = salesModel.getAllSalesById(id);
  
  if (salesById.length === 0 || salesById === []) {
    const error = {
      code: 'notFound',
      message: 'Sale not found',
    };
    throw error;
  }

  return salesById;
};

module.exports = {
  createSale,
  getAllSales,
  getAllSalesById,
};
