const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const connection = require('../../models/connection');
const salesModel = require('../../models/salesModel');

describe('Teste da camada Model - productsModel', () => {
  describe('Inserindo um projeto no banco de dados', () => {
    const product = {
      name: 'limão',
      quantity: 10,
    }
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
    });
    after(async () => {
      connection.execute.restore();
    });

    describe('em caso de sucesso',async () => {
      it('retorna um objeto', async () => {
      const result = await productsModel.createProduct(product.name, product.quantity);
        expect(result).to.be.a('object');
      });
      it('retorna um objeto contendo o insertId', async () => {
        const result = await productsModel.createProduct(product.name, product.quantity);
        expect(result.id).to.be.equals(1);
      })
    })
  })

  describe('Busca todos os produtos no banco de dados', () => {
    describe('quando não há nenhum produto', async () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('verifica se o array está vazio', async () => {
        const result = await productsModel.getAllProducts();
        expect(result).to.be.a('array');
        expect(result).to.be.empty;
      })
    })
    describe('verifica se há produtos', async () => {
      const products = [
        { id: 1,
          name: 'limão',
          quantity: 1
        },
        { id: 2,
          name: 'banana',
          quantity: 2
        },
      ]
      before(async () => {
        sinon.stub(connection, 'execute').resolves([products]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Se irá retornar um array com dois produtos', async () => {
        const result = await productsModel.getAllProducts();
        expect(result).to.be.a('array');
        expect(result).to.have.lengthOf(2);
      })
    })
  })

  describe('Buscar um produto por ID no banco de dados', () => {
    describe('buscando por produto inexistente', async () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('retorna array vazio', async () => {
        const result = await productsModel.getProductsById();
        expect(result).to.be.a('array');
        expect(result).to.be.empty;
      })
    })
    describe('buscando por produto existente', async () => {
      const product = [
        {
          id:1,
          name: 'limão',
          quantity: 10
        },
      ]
      before(async () => {
        sinon.stub(connection, 'execute').resolves([product]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna uma array com um item', async () => {
        const response = await productsModel.getProductsById(1);
        expect(response).to.be.a('array');
        expect(response).to.have.lengthOf(1);
      })
    })
  })

  describe('Atualiza um produto do banco de dados', () => {
    const product = {
      id: 1,
      name: 'limão',
      quantity: 10,
    }
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
    });
    after(async () => {
      connection.execute.restore();
    });

    describe('Quando atualiza com sucesso',async () => {
      it('Retorna um objeto', async () => {
      const result = await productsModel.updateProduct(product.name, product.quantity, product.id);
        expect(result).to.be.a('object');
      });
      it('Retorna um objeto contendo o insertId', async () => {
        const result = await productsModel.updateProduct(product.name, product.quantity, product.id);
        expect(result.insertId).to.be.equals(1);
      })
    })
  })
  
  describe('Removendo um produto do banco de dados', () => {
    const fakeProduct = 1
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
    });
    after(async () => {
      connection.execute.restore();
    });

    describe('removendo um produto com sucesso',async () => {
      it('retorna um objeto', async () => {
      const result = await productsModel.removeProduct(fakeProduct);
        expect(result).to.be.a('object');
      });
      it('Retorna um objeto contendo o insertId', async () => {
        const result = await productsModel.removeProduct(1);
        expect(result.insertId).to.be.equals(1);
      })
    })
  })
})

describe('Teste da camada Model - salesModel', () => {
  describe('Atualiza uma venda do banco de dados', () => {
    describe('Quando atualiza com sucesso', async () => {
      const product = {
        id: 1,
        productId: 1,
        quantity: 10,
      }
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it ('Retorna um objeto contendo o insertId', async () => {
        const result = await salesModel.updateSale(product.id, product.productId, product.quantity);
        expect(result).to.be.a('object');
        expect(result.insertId).to.be.equals(1);
      })
    })
  })
})