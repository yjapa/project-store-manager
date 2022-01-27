module.exports = (err, _req, res, next) => {
  const errorMap = {
    registeredName: 409,
    notFound: 404,
  };

  const status = errorMap[err.code];

  if (!status) {
    return next(err);
  }

   res.status(status).json(err);
};