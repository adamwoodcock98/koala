describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    cy.signUp;
    cy.login;

    cy.url().should("include", "/posts");
  });
});
