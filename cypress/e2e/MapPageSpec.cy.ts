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

  it('should login and display customer dashboard page elements, then navigate to Market Map page and display map elements', () => {
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
      .type('1234')
      .should('have.value', '1234');
    cy.get('.customer-login-container > :nth-child(6)').click();

    cy.wait('@getOneCustomer');
    // Visit the customer dashboard
    // cy.visit('http://localhost:3000/customerdashboard/1');
    cy.visit(
      'https://market-next-door-fe-f6728ad38b62.herokuapp.com/customerdashboard/1'
    );

    //make sure buttons are visible
    cy.get('.orders').should('be.visible');
    cy.get('.map').should('be.visible');
    cy.get('.settings').should('be.visible');
    cy.get('.signout').should('be.visible');

    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/markets/location/80206/10',
      {
        statusCode: 200,
        fixture: 'map80206Stub',
      }
    ).as('getDenverMarkets');

    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/markets/location/80525/15',
      {
        statusCode: 200,
        fixture: 'map80525Stub',
      }
    ).as('getFCMarkets');

    cy.get('.map').click();

    cy.wait('@getDenverMarkets');
    // cy.visit('http://localhost:3000/map/80206/10');
    cy.visit(
      'https://market-next-door-fe-f6728ad38b62.herokuapp.com/map/80206/10'
    );

    // cy.get('.form-map-input').should('be.visible');
    cy.get('.map-page').should('be.visible');

    //Enter a different zipcode & radius, click on Search
    cy.get("input[name='zip']").type('80525').should('have.value', '80525');
    cy.get("input[name='radius']").type('15').should('have.value', '15');
    cy.get('.map-form-button').click();
    cy.wait('@getFCMarkets');
    // cy.visit('http://localhost:3000/map/80525/15');
    cy.visit(
      'https://market-next-door-fe-f6728ad38b62.herokuapp.com/map/80525/15'
    );

    // cy.get('.form-map-input').should('be.visible');
    cy.get('.map-page').should('be.visible');
  });
});
