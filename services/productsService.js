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

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return allProducts;
};

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

  await productsModel.updateProduct(name, quantity, id);
};

const removeProduct = async (id) => {
  const remove = await getProductsById(id);

  await productsModel.removeProduct(id);
  console.log(remove);
  return remove;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  removeProduct,
};