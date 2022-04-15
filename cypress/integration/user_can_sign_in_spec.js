describe("Authentication", () => {
  const firstName = "Barry";
  const lastName = "Barry";
  const email = "test@example.com";
  const password = "12345";

  it("A user signs in and is redirected to /posts", () => {
    cy.signUp(firstName, lastName, email, password);
    cy.login(email, password);

    cy.url().should("include", "/posts");
  });

  it("A user signs in and is redirected to /posts", () => {
    cy.signUp(firstName, lastName, email, password);
    cy.login(email, "wrongPassword");

    cy.url().should("not.include", "/posts");
  });
});
