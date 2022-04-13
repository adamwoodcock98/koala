describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    
    const email = "test@example.com";
    const password = "12345";
    cy.signUp(email, password);
    cy.login(email, password);
    
    cy.addPost('Hello, world!');

    cy.get(".posts").should("contain", "Hello, world!");
  });
});
