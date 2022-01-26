const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (? ,?)';
  const [result] = await connection.execute(query, [name, quantity]);

  const { insertId } = result;
  return {
    id: insertId,
    name,
    quantity,
  };
};

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [result] = await connection.execute(query, [name]);
  return result;
};

module.exports = {
  createProduct,
  getByName,
};