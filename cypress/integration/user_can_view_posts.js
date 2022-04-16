describe("Viewing posts", () => {
  it("A signed in user sees posts in reverse chronological order on /posts", () => {
    const firstName = 'Barry'
    const lastName = 'Barry'
    const email = "test@example.com";
    const password = "12345";

    cy.signUp(firstName, lastName, email, password);
    cy.login(email, password);
    // cy.wait(100);
    cy.addPost("MEHN stack!");
    // cy.wait(100);
    cy.addPost("Testing is so fun!");
    // cy.wait(100);
    cy.addPost("Baddiez don't test!");

    // TODO: target first post using .first, check that it says "Baddiez don't test!"
    // TODO: target second post using .next, check that it says "Testing is so fun!"
    // TODO: target third post using .next, check that it says "MEHN stack!"

    cy.get(".message").should("contain", "Baddiez don't test!");
    cy.get(".message").should("contain", "Testing is so fun!");
    cy.get(".message").should("contain", "MEHN stack!");
    
    
  });
});
