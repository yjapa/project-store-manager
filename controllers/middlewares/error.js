module.exports = (err, _req, res, _next) => {
  console.error(err);

   res.status(500).json({
    code: 'internal_server_error', message: 'error processing request',
  });
};