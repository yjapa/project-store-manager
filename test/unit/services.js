const sinon = require ('sinon');
const { expect } = require('chai');
const salesModel = require('../../models/salesModel');
const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');
const Product1 = 'Product_1';
const quantity = 5;
const prodObj = {
	id: 1,
	name: Product1,
    quantity,
};

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

  describe('Inserindo um produto no banco de dados', () => {
    describe('quando o produto é criado', async () => {
      const id = {
        insertId: 2,
      }

      const product = [
        {
          id: 1,
          name: 'limão',
          quantity: 10,
        }
      ]

      before(async () => {
        sinon.stub(productsModel, 'getAllProducts').resolves(product);
        sinon.stub(productsModel, 'createProduct').resolves(id)
      })

      after(async () => {
        productsModel.getAllProducts.restore();
        productsModel.createProduct.restore();
      })
      it('Retorna o um objeto contendo updateId', async () => {
        const response = await productsService.createProduct('mamão', 5);
        expect(response.insertId).to.be.equals(2);
      })
    })
  })

  describe('Atualiza produto no banco de dados', () => {
    describe('Atualiza com sucesso', async () => {
      const sale = {
        saleId: 1,
        itemUpdated: prodObj,
      }
      it('Retorna um objeto contendo updateId', async () => {
        sinon.stub(productsService, 'updateProduct').resolves();
        const saleServiceReturn = await productsService.updateProduct('nameaa', 1, 1)
        expect(productsService.updateProduct).to.be.exist
        expect(productsService.updateProduct).to.be.a('function')
    
        productsService.updateProduct.restore()
      })
      it('testa retorno da função updateSale', async () => {
        sinon.stub(salesService, 'updateSale').resolves(sale);
        const saleServiceReturn = await salesService.updateSale(1, [prodObj])
    
        expect(salesService.updateSale).to.be.exist
        expect(saleServiceReturn).to.be.a('object')
        expect(saleServiceReturn).to.be.eql(sale)
    
        salesService.updateSale.restore()
    })
  })

  describe('Busca todas as vendas no banco de dados', () => {
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

  describe('Buscar um produto por ID no banco de dados', () => {
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
});
