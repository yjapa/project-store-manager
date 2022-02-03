const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const connection = require('../../models/connection');
const salesModel = require('../../models/salesModel');

describe('Insere um novo produto no banco de dados', () => {
  const product = 'limão';
  const quantity = 5;

  before(() => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
  });

  describe('inserindo produto com sucesso', () => {
      it('função retorna um objeto', async () => {
          const result = await productsModel.createProduct(product, quantity);
          expect(result).to.be.a('object');
      });
      it('o objeto possui um "id"', async () => {
          const result = await productsModel.createProduct(product, quantity);
          expect(result).to.have.a.property('id');
      });
  });

  after(() => {
    connection.execute.restore();
});
});

describe('Insere uma nova venda no banco de dados', () => {
  before(() => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
  });

  describe('inserindo venda com sucesso', () => {
      it('retorna um "id"', async () => {
          const result = await salesModel.createSaleDate();
          expect(result).to.be.eql(1);
      });
  });

  after(() => {
    connection.execute.restore();
});
})

describe('Buscando venda por ID', () => {
  before(() => {
      const execute = [[{ id: 1, date: '2022-01-30' }]];

      sinon.stub(connection, 'execute').resolves(execute);
  });

  describe('buscando com sucesso', () => {
      it('retorna um array', async () => {
          const result = await salesModel.getAllSalesById(1);
          expect([]).to.be.an('array').that.is.empty;
          expect(result).to.be.an('array');
      });

      it('retorna array com chaves "id" e "date"', async () => {
          const result = await salesModel.getAllSalesById(1);
          expect(result).eql([{ id: 1, date: '2022-01-30' }]);
      });
  });


  after(() => {
    connection.execute.restore();
});
});

describe('Cadastra uma venda no banco de dados', () => {
  const products = [
      {
        "product_id": 1,
        "quantity": 2
      },
      {
        "product_id": 2,
        "quantity": 5
      }
    ]

  before(() => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
      connection.execute.restore();
  });

  describe('cadastrando venda com sucesso', () => {
      it('retorna um objeto', async () => {
        const { product_id: productId, quantity } = products; 
        const result = await salesModel.createSalesProduct(1, productId, quantity);
        expect(result).to.be.a('object');
      });
      it('o objeto possui os dados da venda "id" e "itemSold"', async () => {
        const { product_id: productId, quantity } = products; 
        const result = await salesModel.createSalesProduct(1, productId, quantity);
        expect(result).to.have.a.property('id');
        expect(result).to.have.a.property('itemSold');
      });
  });
});
