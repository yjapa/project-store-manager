const rescue = require('express-rescue');
const salesProduct = require('express').Router();

const salesService = require('../services/salesService');
const { salesValidation } = require('./middlewares/index');

const { validateSales } = salesValidation;

salesProduct.post(
  '/',
  validateSales,
  rescue(async (req, res) => {
  const sales = req.body;

  const insertId = await salesService.createSale(sales);

  return res.status(201).json({ id: insertId, itemsSold: sales });
}),
);

salesProduct.get(
  '/',
  rescue(async (_req, res) => {
    const sales = await salesService.getAllSales();

    return res.status(200).json(sales);
  }),
);

salesProduct.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const salesById = await salesService.getAllSalesById(id);
    console.log(salesById, 'controller');

    return res.status(200).json(salesById);
  }),
);

module.exports = salesProduct;
