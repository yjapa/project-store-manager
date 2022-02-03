// const sinon = require('sinon');
// const { expect } = require('chai');
// const productsModel = require('../../models/productsModel');
// const salesService = require('../../services/salesService');
// const productsService = require('../../services/productsService');

// const Product1 = 'Product_1';
// const quantity = 5;
// const prodObj = {
// 	id: 1,
// 	name: Product1,
//   quantity,
// };


// describe('Insere um novo produto no banco de dados', () => {
//   const product = 'mamão';
//   const quantity = 5;
//   const error = {
//       code: 'registeredName',
//       message: 'Product already exists',
//   };

//   describe('verifica se o produto existe no banco', () => {
//       describe('se o produto existir', () => {

//         before(() => {
//             sinon.stub(productsModel, 'getProductByName').resolves([{ id: 1, name: 'banana', quantity: 5 }]);
//         });

//         after(() => {
//             productsModel.getProductByName.restore();
//         });

//         it('dispara error', async () => {
//             try {
//               await productsService.createProduct(product, quantity);
//             } catch (err) {
//               expect(err).to.be.deep.equal(error);
//             }
//           });
//       });
//       describe('se o produto não existir', () => {
//           const newProduct = { id: 1, name: product, quantity, };

//         before(() => {
//           sinon.stub(productsModel, 'getProductByName').resolves([]);
//           sinon.stub(productsModel, 'createProduct').resolves(newProduct);
//           });

//         after(() => {
//           productsModel.getProductByName.restore();
//           productsModel.createProduct.restore();
//           });

//           it('cadastra e retorna um objeto', async () => {
//               const result = await productsService.createProduct(product, quantity);
//               expect(result).to.be.a('object');
//           });
//       });
//   });

//   describe('Retorna dados de um produto ou de todos os produtos', () => {
//     describe('se foi passado um id:', () => {
//         describe('se o produto existe', () => {
//             const product = {
//                 id: 1,
//                 name: 'Geladeira',
//                 quantity: 10,
//             }

//             before(() => {
//                 sinon.stub(productsModel, 'getProductsById').resolves(product);
//             });

//             after(() => {
//                 productsModel.getProductsById.restore();
//             });


//             it('retorna os dados do produto', async () => {
//                 const result = await productsModel.getProductsById(1);
//                 expect(result).to.be.a('object');
//             });
//         });
//         describe('se o produto não existe', () => {
//             before(() => {
//                 sinon.stub(productsModel, 'getProductsById').resolves();
//             });

//             after(() => {
//                 productsModel.getProductsById.restore();
//             });
//             it('lança um erro', async () => {
//                 try {
//                     await productsModel.getProductsById(1);
//                 } catch (error) {
//                     expect(error).to.be.deep.equal({
//                         code: 'notFound',
//                         message: 'Product not found',
//                     })
//                 }
//             });
//         });
//     });
// });
// });
// ////
// describe('Busca todas as vendas no banco de dados', () => {
//   describe('busca realizada com sucesso', () => {
//     describe('se o produto existe', () => {
//       const execute = {
//         saleId: 1,
//         date: '2021-09-09T04:54:29.000Z',
//         product_id: 1,
//         quantity: 2
//       }

//       it('busca e retorna um array', async () => {
//         sinon.stub(salesService, 'getAllSales').resolves([execute]);
//         const result = await salesService.getAllSales();
//         expect(result).to.be.a('array');
//     });
//     });
//   });
// });

// describe('Busca vendas por ID no banco de dados', () => {
//   describe('busca realizada com sucesso', () => {

//     after(() => {
//       salesService.getAllSalesById.restore();
//   });

//       describe('se a venda existe', () => {
//         const execute = {
//           date: '2022-02-03T18:47:51.000Z',
//           product_id: 1,
//           quantity: 10
//         }

//         it('busca e retorna um array', async () => {
//           sinon.stub(salesService, 'getAllSalesById').resolves([execute]);
//           const result = await salesService.getAllSalesById(1);
//           expect(result).to.be.a('array');
//       });
//       });;
//   });
// });

// describe('Busca vendas por ID no banco de dados', () => {
//   describe('busca realizada com falha', () => {
//       describe('se o ID não for encontrado', () => {

//         it('lança um erro', async () => {
//           try {
//               await salesService.getAllSalesById();
//           } catch (error) {
//               expect(error).to.be.deep.equal({
//                   code: 'notFound',
//                   message: 'Sale not found',
//               })
//           }
//       });
//       });;
//   });
// });
