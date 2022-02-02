const connection = require('./connection');

const createSaleDate = async () => {
  const querySale = 'INSERT INTO sales (date) VALUES (current_timestamp());';
  const [result] = await connection.execute(querySale);

  const { insertId } = result;
  return insertId;
};

const createSalesProduct = async (saleId, productId, quantity) => { 
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
  await connection.execute(query, [saleId, productId, quantity]);
};

const getAllSales = async () => {
  const querySales = `SELECT
  s.id AS saleId, s.date, sp.product_id, sp.quantity
  FROM
  sales AS s
  INNER JOIN
  sales_products AS sp
  WHERE
  s.id = sp.sale_id`;
  const [sales] = await connection.execute(querySales);
  return sales;
};

const getAllSalesById = async (id) => {
  const querySalesById = `SELECT
  s.date, sp.product_id, sp.quantity
  FROM
  sales AS s
  INNER JOIN
  sales_products AS sp
  WHERE
  id = ?
  AND
  s.id = sp.sale_id;`;

  const [sales] = await connection.execute(querySalesById, [id]);
  return sales;
};

module.exports = {
  createSaleDate,
  createSalesProduct,
  getAllSales,
  getAllSalesById,
};
