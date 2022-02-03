const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const { domainError, error, productsValidation, salesValidation } = require('../../controllers/middlewares');
const { validateName, validateQuantity } = productsValidation;
const { checkEmptyValues } = salesValidation;

describe('Ao chamar o middleware de erro de domínio', () => {
  const response = {};
  const request = {};
  let next = {};

  before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();
  });

  describe('se o código de erro está mapeado', () => {
      const error = {
          code: 'notFound',
          message: 'not found',
      };

      it('é chamado status com o código do erro', () => {
          domainError(error, request, response, next);
          expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('é chamado json com o erro', () => {
          domainError(error, request, response, next);
          expect(response.json.calledWith(error)).to.be.equal(true);
      });
  });

  describe('se o código do erro não está mapeado', () => {
      const error = {
          code: 'serverError',
          message: 'some server internal error',
      };

      it('é chamado next com o erro', () => {
          domainError(error, request, response, next);
          expect(next.calledWith(error)).to.be.equal(true);
      });
  });
});
