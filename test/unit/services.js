const sinon = require ('sinon');
const { expect } = require('chai');
const salesModel = require('../../models/salesModel');
const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');

describe('Teste da camada Services - salesModel', () => {
  describe('Busca todos os produtos no banco de dados', () => {
    const product = [
      {
        productId: 1,
        name: 'limão',
        quantity: 10,
      }
    ]

    before(async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves([product]);
    })

    after(async () => {
      productsModel.getAllProducts.restore();
    })
    describe('busca em caso de sucesso', async () => {
      it('retorna todos os produtos', async () => {
        const result = await productsService.getAllProducts(1);
        expect([result]).to.be.a('array');
      })
    })
  })

  describe('Buscar um produto por ID no banco de dados', () => {
    const product = [
      {
        productId: 1,
        name: 'limão',
        quantity: 10,
      }
    ]

    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves([product]);
    })

    after(async () => {
      productsModel.getProductsById.restore();
    })
    describe('buscando por produto existente', async () => {
      it('retorna o produto ', async () => {
        const result = await productsService.getProductsById(1);
        expect([result]).to.be.a('array');
      })
    })
  })

  describe('Busca todas as vendas no banco de dados', () => {
    describe('buscando todas vendas', () => {
    describe('se a busca for com sucesso', async () => {
      const product = [
        {
          productId: 1,
          name: 'limão',
          quantity: 10,
        }
      ]

      before(async () => {
        sinon.stub(salesModel, 'getAllSales').resolves(product)
      })

      after(async () => {
        salesModel.getAllSales.restore();
      })
      it('retorna todas vendas no banco', async () => {
        const result = await salesService.getAllSales(1);
        expect([result]).to.be.a('array');
      })
    })
  })

  describe('Buscar uma venda por ID no banco de dados', () => {
    const product = [
      {
        productId: 1,
        name: 'limão',
        quantity: 10,
      }
    ]

    before(async () => {
      sinon.stub(salesModel, 'getAllSalesById').resolves([product]);
    })

    after(async () => {
      salesModel.getAllSalesById.restore();
    })
    describe('buscando por produto existente', async () => {
      it('retorna o produto ', async () => {
        const result = await salesService.getAllSalesById(1);
        expect([result]).to.be.a('array');
      })
    })
  })
})
  describe('Testa se atualiza um produto', () => {
    describe('Atualiza com sucesso', async () => {
      const fakeProduct = {
        insertId: 2,
      }

      const id = 1

      before(async () => {
        sinon.stub(productsModel, 'getProductsById').resolves([id]);
        sinon.stub(productsModel, 'updateProduct').resolves(fakeProduct)
      })

      after(async () => {
        productsModel.getProductsById.restore();
        productsModel.updateProduct.restore();
      })
      it('Retorna um objeto contendo updateId', async () => {
        const response = await productsService.updateProduct('produto_2', 10, 1);
        expect(response.insertId).to.be.equals(2);
      })
    })
  })
});
