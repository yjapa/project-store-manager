const productsModel = require('../models/productsModel');

const productValid = async (name) => {
  const [product] = await productsModel.getProductByName(name);
  if (product) {
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

const getAllProducts = () => productsModel.getAllProducts();

const getProductsById = async (id) => {
  const [product] = await productsModel.getProductsById(id);

  if (!product) {
    const error = {
      code: 'notFound',
      message: 'Product not found',
    };
    throw error;
  }

  return product;
};

const updateProduct = async (name, quantity, id) => {
  await getProductsById(id);

  const update = await productsModel.updateProduct(name, quantity, id);

  return update;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
};