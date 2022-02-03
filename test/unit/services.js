const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

describe('Insere um novo produto no banco de dados', () => {
  const product = 'mamão';
  const quantity = 5;
  const error = {
      code: 'registeredName',
      message: 'Product already exists',
  };

  describe('verifica se o produto existe no banco', () => {
      describe('se o produto existir', () => {

        before(() => {
            sinon.stub(productsModel, 'getProductByName').resolves([{ id: 1, name: 'banana', quantity: 5 }]);
        });

        after(() => {
            productsModel.getProductByName.restore();
        });

        it('dispara error', async () => {
            try {
              await productsService.createProduct(product, quantity);
            } catch (err) {
              expect(err).to.be.deep.equal(error);
            }
          });
      });
      describe('se o produto não existir', () => {
          const newProduct = { id: 1, name: product, quantity, };

        before(() => {
          sinon.stub(productsModel, 'getProductByName').resolves([]);
          sinon.stub(productsModel, 'createProduct').resolves(newProduct);
          });

        after(() => {
          productsModel.getProductByName.restore();
          productsModel.createProduct.restore();
          });

          it('cadastra e retorna um objeto', async () => {
              const result = await productsService.createProduct(product, quantity);
              expect(result).to.be.a('object');
          });
      });
  });

  describe('Retorna dados de um produto ou de todos os produtos', () => {
    describe('se foi passado um id:', () => {
        describe('se o produto existe', () => {
            const product = {
                id: 1,
                name: 'Geladeira',
                quantity: 10,
            }

            before(() => {
                sinon.stub(productsModel, 'getProductsById').resolves(product);
            });

            after(() => {
                productsModel.getProductsById.restore();
            });


            it('retorna os dados do produto', async () => {
                const result = await productsModel.getProductsById(1);
                expect(result).to.be.a('object');
                // expect(result).to.be.deep.equal(product);
            });
        });
        describe('se o produto não existe', () => {
            before(() => {
                sinon.stub(productsModel, 'getProductsById').resolves();
            });

            after(() => {
                productsModel.getProductsById.restore();
            });
            it('lança um erro', async () => {
                try {
                    await productsModel.getProductsById(1);
                } catch (error) {
                    expect(error).to.be.deep.equal({
                        code: 'notFound',
                        message: 'Product not found',
                    })
                }
            });
        });
    });
});
});