const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const { domainError, error, productsValidation, salesValidation } = require('../../controllers/middlewares');
const { validateName, validateQuantity } = productsValidation;

describe('Ao chamar o middleware de erro de domínio', () => {
  const response = {};
  const request = {};
  let next = {};

  before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();
  });

  describe('código de erro mapeado', () => {
      const error = {
          code: 'notFound',
          message: 'not found',
      };

      it('retorna o status com o código do erro', () => {
          domainError(error, request, response, next);
          expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('retorna mensagem de erro', () => {
          domainError(error, request, response, next);
          expect(response.json.calledWith(error)).to.be.equal(true);
      });
  });

  describe('código de erro não mapeado', () => {
      const error = {
          code: 'internal_server_error',
          message: 'error processing request',
      };

      it('retorna o next com o erro', () => {
          domainError(error, request, response, next);
          expect(next.calledWith(error)).to.be.equal(true);
      });
  });
});

describe('código de erro do servidor', () => {
  const response = {};
  const request = {};
  let next = {};
  const err = {
      code: 'internal_server_error',
      message: 'error processing request',
  };

  before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  });

  it('retorna status 500', () => {
      error(err, request, response, next);
      expect(response.status.calledWith(500)).to.be.equal(true);
  });
  it('retorna json com o erro', () => {
      error(err, request, response, next);
      expect(response.json.calledWith(err)).to.be.equal(true);
  });
});