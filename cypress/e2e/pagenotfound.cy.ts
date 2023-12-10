/// <reference types="cypress" />

describe("should log a customer in and navigate to customer dashboard", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/",
      { statusCode: 200, fixture: "allCustomersStub" }
    ).as("getAllCustomers");
    cy.intercept(
      "GET",
      "https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/",
      { statusCode: 200, fixture: "allVendorsStub" }
    ).as("getAllVendors");

    cy.visit("https://market-next-door-fe-f6728ad38b62.herokuapp.com/");

    cy.wait("@getAllCustomers");
    cy.wait("@getAllVendors");
  });

  it("should navigate to a 'page not found' page if the user types in a url that a route has not been created for", () => {
    cy.visit("https://market-next-door-fe-f6728ad38b62.herokuapp.com/potatoes");
    cy.get('[cy-test="error-message"]').should(
      "have.text",
      "Am I at the right market? I think I'm lost..."
    );
  });
});
