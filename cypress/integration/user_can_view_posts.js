describe("Viewing posts", () => {
  it("A signed in user sees posts on /posts", () => {
    const email = "test@example.com";
    const password = "12345";

    cy.signUp(email, password);
    cy.login(email, password);

    cy.get("#message-input").type("MEHN stack!");
    cy.get("#new-post-form").submit();

    cy.get("#message-input").type("Testing is so fun!");
    cy.get("#new-post-form").submit();

    cy.get("#message-input").type("Baddiez don't test!");
    cy.get("#new-post-form").submit();

    cy.get(".post-body").should("contain", "MEHN stack!");
    cy.get(".post-body").should("contain", "Testing is so fun!");
    cy.get(".post-body").should("contain", "Baddiez don't test!");
  });
});
