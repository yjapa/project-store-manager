const connection = require('./connection');

const createProduct = async (name, age) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (? ,?)';
  const [result] = await connection.execute(query, [name, age]);

  const { insertId } = result;
  return {
    id: insertId,
    name,
    age,
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