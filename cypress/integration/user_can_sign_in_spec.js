describe("Authentication", () => {
  
  it("A user signs in and is redirected to /posts", () => {
    cy.signUp;
    cy.login;

    cy.url().should("include", "/posts");
  });

  it("A user signs in and is redirected to /posts", () => {
    cy.signUp;
    cy.login("123@example.com", "wrongPassword");

    cy.url().should("not.include", "/posts");
  });
});
