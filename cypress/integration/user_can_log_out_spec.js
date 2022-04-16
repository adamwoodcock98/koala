describe("Logging Out", () => {
  const firstName = "Barry";
  const lastName = "Barry";
  const email = "test@example.com";
  const password = "12345";

  it("A user that logs out is redirected to /sessions", () => {
    cy.signUp(firstName, lastName, email, password);
    cy.login(email, password);
    cy.get("#dropdownUser1").click();
    cy.get("#signOut").click();

    cy.url().should("not.include", "/posts");
    cy.url().should("include", "/sessions/new");
  });

  it("A user that has logged out cannot view posts", () => {
    cy.signUp(firstName, lastName, email, password);
    cy.login(email, password);
    cy.get("#dropdownUser1").click();
    cy.get("#signOut").click();
    cy.visit("/posts");

    cy.url().should("not.include", "/posts");
    cy.url().should("include", "/sessions/new");
  });
});
