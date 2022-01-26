const productsModel = require('../models/productsModel');

const productValid = async (name) => {
  const product = await productsModel.getByName(name);
  if (product) {
    return true;
  }
  return false;
};

const createProduct = async (name, quantity) => {
  const product = await productValid(name);
  
  if (product) {
    throw new Error({
      code: 'registeredName',
      message: 'Product already exists',
    });
  }

  const result = await productsModel.create(name, quantity);
    return result;
};

module.exports = {
  createProduct,
};