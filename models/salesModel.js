const connection = require('./connection');

const createSale = async (data) => {
  const querySale = 'INSERT INTO sales (date) VALUES (current_timestamp());';
  const [result] = await connection.execute(querySale);

  const { insertId } = result;
  data.forEach(async (sale) => {
    const { product_id: productId, quantity } = sale;
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ? ,?);';
    await connection.execute(query, [insertId, productId, quantity]);
  });
  return insertId;
};

module.exports = {
  createSale,
};
