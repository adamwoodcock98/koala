// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "signUp",
  (
    firstName = "Barry",
    lastName = "Barry-Barroldsson",
    email = "123@example.com",
    password = "123"
  ) => {
    cy.visit("/users/new");
    if (firstName) cy.get("#sign-up-first-name").type(firstName);
    if (lastName) cy.get("#sign-up-last-name").type(lastName);
    if (email) cy.get("#sign-up-email").type(email);
    if (password) cy.get("#sign-up-password").type(password);
    cy.get("#submit").click();
  }
);

Cypress.Commands.add("login", (email = "123@example.com", password = "123") => {
  cy.visit("/sessions/new");
  cy.get("#sign-in-email").type(email);
  cy.get("#sign-in-password").type(password);
  cy.get("#submit").click();
});

Cypress.Commands.add("addPost", (text) => {
  cy.visit("/posts");
  cy.get("#message-input").type(text, { force: true });
  cy.get("#new-post-form").submit();
});
