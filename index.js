require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const productsController = require('./controllers/productsController');

app.use(bodyParser.json());

app.use('/people', productsController);

app.use((err, _req, res, next) => {
  const errorMap = {
    registeredName: 409,
  };

  const status = errorMap[err.code];

  if (!status) {
    return next(err);
  }

  return res.status(status).json(err);
});

app.use((err, _req, res, _next) => {
  console.error(err);

  return res.status(500).json({
    code: 'internal_server_error', message: 'error processing request',
  });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
