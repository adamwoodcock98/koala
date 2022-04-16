describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    cy.signUp;
    cy.login;
    
    cy.addPost('Hello, world!');

    cy.get(".message").should("contain", "Hello, world!");
  });
});

