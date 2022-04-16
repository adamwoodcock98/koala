describe.skip("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    cy.signUp();
    cy.login();

    cy.url().should("include", "/posts");
  });

  it("A user signs in and is redirected to /posts", () => {
    cy.signUp("bob", "smith", "bob@smith.com", "rightPassword");
    cy.login("bob@smith.com", "wrongPassword");

    cy.url().should("not.include", "/posts");
  });
});
