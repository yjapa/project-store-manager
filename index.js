require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const middlewares = require('./controllers/middlewares/index');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.use(bodyParser.json());

app.use('/products', productsController);
app.use('/sales', salesController);

app.use(middlewares.domainError);

// app.use(middlewares.error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
