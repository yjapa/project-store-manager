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
  const [result] = await connection.execute('SELECT * FROM products;');

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
  const result = {
      insertId: id,
      name,
      quantity,
  };
  return result;
};

const removeProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductsById,
  updateProduct,
  removeProduct,
};