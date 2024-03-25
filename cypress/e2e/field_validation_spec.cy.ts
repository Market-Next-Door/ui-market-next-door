describe('field validation for vendor item creation', () => {
  it("should give guidance to the user if they haven't filled in all required fields for inputs", () => {
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/vendors/',
      { statusCode: 200, fixture: 'allVendorsStub' }
    ).as('getAllVendors');
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/customers/',
      { statusCode: 200, fixture: 'allCustomersStub' }
    ).as('getAllCustomers');
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/vendors/*/items/',
      { statusCode: 200, fixture: 'vendor1ItemsStub' }
    ).as('getVendor1Items');
    cy.intercept(
      'GET',
      'https://quiet-depths-54407-77a00505f51e.herokuapp.com/api/v1/vendors/2/',
      { statusCode: 200, fixture: 'vendor2Stub' }
    ).as('getVendor2');
    cy.visit('https://market-next-door-fe-f6728ad38b62.herokuapp.com/')
      .wait('@getAllVendors')
      .wait('@getAllVendors')
      .wait('@getAllCustomers');
    cy.get('.landing-btns > :nth-child(1)').click();
    cy.get('[name="vendorEmail"]')
      .type('jj@gmail.com')
      .should('have.value', 'jj@gmail.com');
    cy.get('[name="vendorPassword"]').should('not.have.value');
    cy.get('.vendor-login-container > :nth-child(6)').click();
    cy.get('.message').should(
      'contain',
      'Oops! Check your email and password. Or sign up for an account.'
    );
    cy.get('[name="vendorPassword"]').type('1234').should('have.value', '1234');
    cy.get('.vendor-login-container > :nth-child(6)')
      .click()
      .wait('@getVendor2');
    cy.get('.add-item-item-name')
      .type('Cherries')
      .should('have.value', 'Cherries');
    cy.get('.add-item-item-size').type('2 lbs').should('have.value', '2 lbs');
    cy.get('.add-item-item-price').type('3.99').should('have.value', '3.99');
    cy.get('.add-item-item-quantity').should('not.have.value');
    cy.get('.add-item-item-quantity').type('100').should('have.value', '100');
    cy.on('window:alert', alertText => {
      expect(alertText).to.eq('Please fill in all the fields!');
    });
    cy.get('.post-btn').click().wait('@getVendor2');
  });
});
