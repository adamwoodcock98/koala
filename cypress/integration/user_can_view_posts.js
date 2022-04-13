describe("Viewing posts", () => {
  it("A signed in user sees posts on /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("/posts");
    // cy.contains("New post").click();

    // cy.get("#new-post-form").find('[type="text"]').type("MEHN stack!");
    // cy.get("#new-post-form").submit();

    // cy.visit("/posts");
    // cy.contains("New post").click();

    // cy.get("#new-post-form").find('[type="text"]').type("Testing is so fun!");
    // cy.get("#new-post-form").submit();

    // cy.visit("/posts");
    // cy.contains("New post").click();

    // cy.get("#new-post-form").find('[type="text"]').type("Baddiez don't test!");
    // cy.get("#new-post-form").submit();

    // cy.get(".posts").should("contain", "MEHN stack!");
    // cy.get(".posts").should("contain", "Testing is so fun!");
    // cy.get(".posts").should("contain", "Baddiez don't test!");
  });
});
