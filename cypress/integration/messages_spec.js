describe("Messages", () => {
  it("it displays all friends on the messages index page", () => {
    cy.signUp();
    cy.login();

    cy.visit("/message");

    cy.get(".message").should("contain", "Choose a conversation");
  });
});
