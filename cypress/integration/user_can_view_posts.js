const { it, cy } = require("date-fns/locale");

describe("Viewing posts", () => {
  it("A signed in user sees posts in reverse chronological order on /posts", () => {
    cy.signUp();
    cy.login();
    cy.addPost("MEHN stack!");
    cy.addPost("Testing is so fun!");
    cy.addPost("Baddiez don't test!");

    // TODO: target first post using .first, check that it says "Baddiez don't test!"
    // TODO: target second post using .next, check that it says "Testing is so fun!"
    // TODO: target third post using .next, check that it says "MEHN stack!"

    cy.get(".message").should("contain", "Baddiez don't test!");
    cy.get(".message").should("contain", "Testing is so fun!");
    cy.get(".message").should("contain", "MEHN stack!");
  });

  it("should only display posts from people in friends list", () => {
    cy.signUp();
    cy.login();
    cy.addPost("MEHN stack!");
    cy.addPost("Testing is so fun!");
    cy.addPost("Baddiez don't test!");
    cy.get("#dropdownUser1").click();
    cy.get("#signOut").click();

    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login("rick@ick.com", "securer1ck");

    cy.get(".message").should("not.contain", "Baddiez don't test!");
    cy.get(".message").should("not.contain", "Testing is so fun!");
    cy.get(".message").should("not.contain", "MEHN stack!");
  });

  it("should only display posts from people in friends list", () => {
    cy.signUp();
    cy.login();
    cy.addPost("MEHN stack!");
    cy.addPost("Testing is so fun!");
    cy.addPost("Baddiez don't test!");
    cy.get("#dropdownUser1").click();
    cy.get("#signOut").click();

    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login("rick@ick.com", "securer1ck");

    cy.get(".message").should("not.contain", "Baddiez don't test!");
    cy.get(".message").should("not.contain", "Testing is so fun!");
    cy.get(".message").should("not.contain", "MEHN stack!");

    cy.get("#searchBox").type("Barry Barry-Barroldsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();

    cy.get("#friend-unfriend-button").click();

    cy.get("#dropdownUser1").click();
    cy.get("#signOut").click();
    cy.login("rick@ick.com", "securer1ck");

    cy.get(".message").should("not.contain", "Baddiez don't test!");
    cy.get(".message").should("not.contain", "Testing is so fun!");
    cy.get(".message").should("not.contain", "MEHN stack!");
  });
});
