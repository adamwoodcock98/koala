describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    
    const email = "test@example.com";
    const password = "12345";
    cy.signUp(email, password);
    cy.login(email, password);
    
    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
  });
});
