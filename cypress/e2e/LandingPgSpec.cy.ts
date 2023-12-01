describe("should load landing page elements", () => {
  it("should display landing page elements", () => {
    cy.visit("http://localhost:3000");
    cy.get(".landing-tagline").should("contain", "Community");
    cy.get(".landing-header").should("have.text", "MARKET NEXT DOOR");
  });
});
