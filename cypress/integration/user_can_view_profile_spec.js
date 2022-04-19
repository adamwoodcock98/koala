describe.only("Viewing a profile", () => {
  
  it("should displays the users details", () => {
    cy.signUp();
    cy.login();
    cy.visit("/profile")

    cy.get("#name-pronouns").should("contain", "Barry Barry-Barroldsson");
    cy.get("#name-pronouns").should("contain", "They/Them");

    cy.get(".friends-container").should("contain", "Your friends");

    cy.get(".about-container").should("contain", "About me")
  });

  it("should display the users posts", () => {
    cy.signUp();
    cy.login();

    cy.addPost("MEHN stack!");
    cy.addPost("Testing is so fun!");
    cy.addPost("Baddiez don't test!");

    cy.visit("/profile");

    cy.get(".message").should("contain", "Baddiez don't test!");
    cy.get(".message").should("contain", "Testing is so fun!");
    cy.get(".message").should("contain", "MEHN stack!");
  });

});