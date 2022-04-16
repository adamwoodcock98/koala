describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    cy.signUp();
    cy.login();

    cy.url().should("include", "/posts");
  });

  it("A user signs in and is redirected to /posts", () => {
    cy.signUp(firstName, lastName, email, password);
    cy.login(email, "wrongPassword");

    cy.url().should("not.include", "/posts");
  });
});
