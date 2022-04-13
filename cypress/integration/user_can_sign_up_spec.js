describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    const email = "test@example.com";
    const password = "12345";
    cy.signUp(email, password);
    cy.url().should("include", "/sessions/new");
  });
});
