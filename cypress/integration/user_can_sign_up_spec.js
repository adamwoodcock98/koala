describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    cy.signUp();
    cy.url().should("include", "/sessions/new");
  });

  it("An error is shown when a user tries to sign up with an already existing email address", () => {
    cy.signUp();
    cy.signUp();
    cy.url().should("include", "/users/new");
    cy.get("#error-message").should("contain", "Email already exists");
  });

  it("An error is shown when a user tries to sign up with no first name", () => {
    cy.signUp(null);
    cy.get("#error-message").should("contain", "All fields are required");
  });

  it("An error is shown when a user tries to sign up with no last name", () => {
    cy.signUp("Barry", null);
    cy.get("#error-message").should("contain", "All fields are required");
  });

  it("An error is shown when a user tries to sign up with no password", () => {
    cy.signUp("Barry", "Barry-Barroldsson", "123@example.com", null);
    cy.get("#error-message").should("contain", "All fields are required");
  });
});
