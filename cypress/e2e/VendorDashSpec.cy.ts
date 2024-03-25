/// <reference types="cypress" />

describe('should log a vendor in and navigate to vendor dashboard', () => {
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

  it('should login and display vendor dashboard page elements', () => {
    // Intercept GET for one vendor
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/vendors/*',
      { statusCode: 200, fixture: 'oneVendorStub' }
    ).as('getOneVendor');

    // Vendor login actions
    cy.get('.landing-btns > :nth-child(2)').click();
    // cy.visit('http://localhost:3000/vendorlogin');
    cy.visit(
      'https://market-next-door-fe-f6728ad38b62.herokuapp.com/vendorlogin'
    );
    cy.get("input[name='vendorEmail']")
      .type('jj@gmail.com')
      .should('have.value', 'jj@gmail.com');
    cy.get("input[name='vendorPassword']")
      .type('1234')
      .should('have.value', '1234');
    cy.get('.vendor-login-container > :nth-child(6)').click();

    cy.wait('@getOneVendor');

    // Visit the vendor dashboard
    // cy.visit('http://localhost:3000/vendordashboard/1');
    cy.visit(
      'https://market-next-door-fe-f6728ad38b62.herokuapp.com/vendordashboard/1'
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

    //add a new item
    cy.intercept(
      'POST',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/vendors/*/items/',
      {
        statusCode: 201,
        fixture: 'vendor1newItemStub',
      }
    ).as('postVendor1Item');

    cy.get("input[name='add-item-name']").type('Garlic');
    cy.get("input[name='add-item-size']").type('Each');
    cy.get("input[name='add-item-price']").type('1.89');
    cy.get("input[name='add-item-quantity']").type('250');
    cy.get("input[name='add-item-notes']").type('Elephant garlic.');
    cy.get("input[name='add-item-file']").attachFile('garlic.jpg');
    cy.get('.post-btn').click();

    cy.wait('@postVendor1Item');

    //Vendor items should be visible
    cy.wait('@getVendor1Items');
    cy.get('.add-item-form').should('be.visible');
    cy.get('.vendor-items-display').should('have.length', 1);
    cy.get('.vendor-items-display > :nth-child(1)').should('be.visible');
    cy.get(
      ':nth-child(1) > .vendor-item-details > :nth-child(1) > .item-input'
    ).should('have.value', 'Red Potatoes');
    cy.get(
      ':nth-child(4) > .vendor-item-details > :nth-child(1) > .item-input'
    ).should('have.value', 'Pumpkin');
  });
});
