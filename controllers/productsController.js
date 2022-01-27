const rescue = require('express-rescue');
const products = require('express').Router();

const productsService = require('../services/productsService');
const { productsValidation } = require('./middlewares/index');

const { validateName, validateQuantity } = productsValidation;

products.post(
  '/',
  validateName,
  validateQuantity,
  rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.createProduct(name, quantity);

  return res.status(201).json(newProduct); 
}),
);

products.get(
  '/',
  rescue(async (_req, res) => {
    const allProducts = await productsService.getAllProducts();

    return res.status(200).json(allProducts);
  }),
);

products.get(
  '/:id',
  rescue(async (_req, res) => {
    const { id } = _req.params;

    const productById = await productsService.getProductsById(id);

    return res.status(200).json(productById);
  }),
);

products.put(
  '/:id',
  validateName,
  validateQuantity,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    
    await productsService.updateProduct(name, quantity, id);

    return res.status(200).json({ id, name, quantity });
  }),
);

module.exports = products;