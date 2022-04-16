describe("Viewing posts", () => {
  it("A signed in user sees posts in reverse chronological order on /posts", () => {cy.signUp();
    cy.login();
    cy.addPost("MEHN stack!");
    cy.addPost("Testing is so fun!");
    cy.addPost("Baddiez don't test!");

    // TODO: target first post using .first, check that it says "Baddiez don't test!"
    // TODO: target second post using .next, check that it says "Testing is so fun!"
    // TODO: target third post using .next, check that it says "MEHN stack!"

    cy.get(".message").should("contain", "Baddiez don't test!");
    cy.get(".message").should("contain", "Testing is so fun!");
    cy.get(".message").should("contain", "MEHN stack!");
    
    
  });
});
