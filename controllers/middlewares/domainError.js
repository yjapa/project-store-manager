module.exports = (err, _req, res, next) => {
  const errorMap = {
    registeredName: 409,
    notFound: 404,
    requiredField: 400,
    unprocessableQuantity: 422,
  };

  const status = errorMap[err.code];

  if (!status) {
    return next(err);
  }

  return res.status(status).json(err);
};