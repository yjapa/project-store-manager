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

module.exports = salesProduct;
