describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    const email = "test@example.com";
    const password = "12345";

    cy.signUp(email, password);
    cy.login(email, password);

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
