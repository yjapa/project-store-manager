const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (? ,?);';
  const [result] = await connection.execute(query, [name, quantity]);

  const { insertId } = result;
  return {
    id: insertId,
    name,
    quantity,
  };
};

const getProductByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?;';
  const [result] = await connection.execute(query, [name]);
  return result;
};

const getAllProducts = async () => {
  const query = 'SELECT * FROM products;';
  const [result] = await connection.execute(query);
  return result;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const updateProduct = async (name, quantity, id) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';
  await connection.execute(query, [name, quantity, id]);
};

const removeProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?;';
  await connection.execute(query, [id]);
};

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductsById,
  updateProduct,
  removeProduct,
};