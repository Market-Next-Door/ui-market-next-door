/// <reference types="cypress" />

describe('should load customer dashboard elements', () => {
  it('should display customer dashboard page elements', () => {
    cy.visit('https://market-next-door-fe-f6728ad38b62.herokuapp.com/');
    cy.get('.customer-container > .vendor-header').should(
      'have.text',
      'Welcome, Vendors and Customers!'
    );
    cy.get('.customer-find-vendor').should('have.length', 1);
    cy.get('.search-input').should('exist');
    cy.get('.customer-view-items-display').should('have.length', 1);
    cy.get('.customer-view-items-display > :nth-child(1)').should(
      'have.length',
      1
    );
  });
});
