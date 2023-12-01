describe("should load landing page elements", () => {
  it("should display landing page elements", () => {
    cy.visit("https://market-next-door-fe-f6728ad38b62.herokuapp.com/");
    cy.get(".landing-tagline").should("contain", "Community");
    cy.get(".landing-header").should("have.text", "MARKET NEXT DOOR");
  });
});
