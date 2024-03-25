/// <reference types="cypress" />

describe('should log a customer in and navigate to customer dashboard', () => {
  beforeEach(() => {
    // Setup intercepts for all customers and all vendors
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/customers/',
      { statusCode: 200, fixture: 'allCustomersStub' }
    ).as('getAllCustomers');
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/vendors/',
      { statusCode: 200, fixture: 'allVendorsStub' }
    ).as('getAllVendors');

    // Visit the initial page
    // cy.visit('http://localhost:3000/');
    cy.visit('https://market-next-door-fe-f6728ad38b62.herokuapp.com/');

    // Wait for initial data loading intercepts
    cy.wait('@getAllCustomers');
    cy.wait('@getAllVendors');
  });

  it('should login and display customer dashboard page elements', () => {
    // Intercept GET for one customer
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/customers/*',
      { statusCode: 200, fixture: 'oneCustomerStub' }
    ).as('getOneCustomer');

    // Customer login actions
    cy.get('.landing-btns > :nth-child(2)').click();
    // cy.visit('http://localhost:3000/customerlogin');
    cy.visit(
      'https://market-next-door-fe-f6728ad38b62.herokuapp.com/customerlogin'
    );
    cy.get("input[name='customerEmail']")
      .type('jj@gmail.com')
      .should('have.value', 'jj@gmail.com');
    cy.get("input[name='customerPassword']")
      .type('password')
      .should('have.value', 'password');
    cy.get('.customer-login-container > :nth-child(6)').click();

    cy.wait('@getOneCustomer');

    // Visit the customer dashboard
    // cy.visit('http://localhost:3000/customerdashboard/1');
    cy.visit(
      'https://market-next-door-fe-f6728ad38b62.herokuapp.com/customerdashboard/1'
    );

    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/vendors/*/items/',
      { statusCode: 200, fixture: 'vendor1ItemsStub' }
    ).as('getVendor1Items');

    //make sure buttons are visible
    cy.get('.orders').should('be.visible');
    cy.get('.settings').should('be.visible');
    cy.get('.signout').should('be.visible');

    //Select the vendor and wait for the results
    cy.get('.select-input')
      .select('Potato Spuuuds')
      .should('have.value', 'Potato Spuuuds');
    cy.wait('@getVendor1Items');
    cy.get('.customer-view-items-display').should('have.length', 1);
    cy.get('.customer-view-items-display > :nth-child(1)').should(
      'contain',
      'tomatoes'
    );
    cy.get('.customer-view-items-display > :nth-child(3)').should(
      'contain',
      'Pumpkin'
    );
  });
});
