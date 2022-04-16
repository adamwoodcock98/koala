describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    cy.signUp;
    cy.url().should("include", "/sessions/new");
  });
});
