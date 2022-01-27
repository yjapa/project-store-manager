const validateId = (id) => {
  if (id === undefined) {
    const error = {
      code: 'requiredField',
      message: '"product_id" is required',
    };
    throw error;
  }
};

const validateQuantity = (quantity) => {
  if (quantity === undefined) {
    const error = {
      code: 'requiredField',
      message: '"quantity" is required',
    };
    throw error;
  }

  if (typeof (quantity) === 'string' || quantity < 1) {
    const error = {
      code: 'unprocessableQuantity',
      message: '"quantity" must be a number larger than or equal to 1',
    };
    throw error;
  }
  return true;
};

  const validateSales = (req, _res, next) => {
    const sales = req.body;
    sales.forEach((sale) => {
      validateId(sale.product_id);
      validateQuantity(sale.quantity);
    });
  
    next();
  };

module.exports = {
  validateSales,
};