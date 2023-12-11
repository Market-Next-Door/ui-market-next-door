/// <reference types="cypress" />

describe('should load landing page elements', () => {
  it('should display landing page elements', () => {
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/',
      { statusCode: 200, fixture: 'allVendorsStub' }
    ).as('getAllVendors');
    cy.intercept(
      "GET",
      "https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/",
      { statusCode: 200, fixture: "allCustomersStub" }
    ).as("getAllCustomers");
    cy.visit('https://market-next-door-fe-f6728ad38b62.herokuapp.com/').wait('@getAllVendors').wait('@getAllCustomers');
    // cy.visit('http://localhost:3000')
    cy.get('.landing-tagline').should('contain', 'Community');
    cy.get('.landing-header').should('have.text', 'MARKET NEXT DOOR');
    cy.get('.landing-container > :nth-child(3)').should(
      'have.text',
      'Perfectly Imperfect Goods & Foods'
    );
    cy.get('.landing-btns > :nth-child(1)').should('exist');
    cy.get('.landing-btns > :nth-child(2)').should('exist');
    cy.get('.how-it-works-steps').should('be.visible');
  });
});
