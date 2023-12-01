/// <reference types="cypress" />

describe('should load vendor dashboard page elements', () => {
  it('should display vendor dashboard page elements', () => {
    cy.visit('https://market-next-door-fe-f6728ad38b62.herokuapp.com/');
    cy.get('.vendor-container > .vendor-header').should(
      'have.text',
      'Welcome, Vendors and Customers!'
    );
    cy.get('.vendor-container > .vendor-nav').should('have.length', 1);
    cy.get('.add-item-form').should('be.visible');
    cy.get('.vendor-items-display').should('be.visible');
  });
});
