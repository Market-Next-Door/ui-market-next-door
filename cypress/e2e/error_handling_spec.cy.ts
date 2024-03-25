/// <reference types="cypress" />

describe('404 and 502 Error Handling', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/vendors/',
      { statusCode: 200, fixture: 'allVendorsStub' }
    ).as('getAllVendors');
  });
  it('should show an error page with a 404 Not Found message when network request for all customers fails', () => {
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/customers/',
      { statusCode: 404, body: '' }
    ).as('getAllCustomers');
    cy.visit('https://market-next-door-fe-f6728ad38b62.herokuapp.com/').wait(
      '@getAllCustomers'
    );
    cy.get('.error-container > :nth-child(2)').should(
      'contain',
      '404 Not Found'
    );
  });
  it('should show an error page with a 502 Bad Gateway message when network request for all customers fails', () => {
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/customers/',
      { statusCode: 502, body: '' }
    ).as('getAllCustomers');
    cy.visit('https://market-next-door-fe-f6728ad38b62.herokuapp.com/').wait(
      '@getAllCustomers'
    );
    cy.get('.error-container > :nth-child(2)').should(
      'contain',
      '502 Bad Gateway'
    );
  });
});
