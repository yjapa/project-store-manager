const rescue = require('express-rescue');
const products = require('express').Router();

const productsService = require('../services/productsService');
const { productsValidation } = require('./middlewares/index');

const { validateName, validateQuantity } = productsValidation;

products.post('/', validateName, validateQuantity, rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.createProduct(name, quantity);
  return res.status(201).json(newProduct); 
}));

module.exports = products;