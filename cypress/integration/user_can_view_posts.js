describe("Viewing posts", () => {
  it("A signed in user sees posts on /posts", () => {
    const email = "test@example.com";
    const password = "12345";

    cy.signUp(email, password);
    cy.login(email, password);
    cy.addPost("MEHN stack!");
    cy.addPost("Testing is so fun!");
    cy.addPost("Baddiez don't test!");

    cy.get(".posts").should("contain", "MEHN stack!");
    cy.get(".posts").should("contain", "Testing is so fun!");
    cy.get(".posts").should("contain", "Baddiez don't test!");
  });
});