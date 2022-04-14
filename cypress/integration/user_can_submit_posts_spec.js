describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    const email = "test@example.com";
    const password = "12345";

    cy.signUp(email, password);
    cy.login(email, password);

    cy.get("#message-input").type("Yo");
    cy.get("#new-post-form").submit();
    cy.get(".post-body").should("contain", "Yo");
  });
});
