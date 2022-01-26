const productsModel = require('../models/productsModel');

const productValid = async (name) => {
  const product = await productsModel.getByName(name);
  if (product[0]) {
    return true;
  }
  return false;
};

const createProduct = async (name, quantity) => {
  const product = await productValid(name);
  
  if (product) {
    const error = {
      code: 'registeredName',
      message: 'Product already exists',
    };
    throw error;
  }

  const result = await productsModel.createProduct(name, quantity);
    return result;
};

module.exports = {
  createProduct,
};