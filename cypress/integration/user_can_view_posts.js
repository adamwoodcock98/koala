describe("Viewing posts", () => {
  it("A signed in user sees posts on /posts", () => {
    const firstName = 'Barry'
    const lastName = 'Barry'
    const email = "test@example.com";
    const password = "12345";

    cy.signUp(firstName, lastName, email, password);
    cy.login(email, password);
    cy.addPost("MEHN stack!");
    cy.addPost("Testing is so fun!");
    cy.addPost("Baddiez don't test!");

    cy.get(".message").should("contain", "MEHN stack!");
    cy.get(".message").should("contain", "Testing is so fun!");
    cy.get(".message").should("contain", "Baddiez don't test!");
  });
});