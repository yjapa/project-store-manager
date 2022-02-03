const salesModel = require('../models/salesModel');

const createSale = async (sales) => {
  const insertId = await salesModel.createSaleDate();

  await Promise.all(sales.map(async (sale) => {
    const { product_id: productId, quantity } = sale;

    await salesModel.createSalesProduct(insertId, productId, quantity);
  }));
  return insertId;
};

const getAllSales = async () => salesModel.getAllSales();

const getAllSalesById = async (id) => {
  const salesById = await salesModel.getAllSalesById(id);
  
  if (salesById.length === 0) {
    const error = {
      code: 'notFound',
      message: 'Sale not found',
    };
    throw error;
  }

  return salesById;
};

const updateSale = async (saleId, sales) => {
  await Promise.all(sales.map(async (sale) => {
    const { product_id: productId, quantity } = sale;
    await salesModel.updateSale(saleId, productId, quantity);
  }));
};

module.exports = {
  createSale,
  getAllSales,
  getAllSalesById,
  updateSale,
};
