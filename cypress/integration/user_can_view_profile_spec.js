describe.only("Viewing a profile", () => {
  xit("should displays the users details", () => {
    cy.signUp();
    cy.login();
    cy.get("#dropdownSessionUser").click();
    cy.get("#dropdown-profile-link").click();

    cy.get("#name-pronouns").should("contain", "Barry Barry-Barroldsson");
    // cy.get("#name-pronouns").should("contain", "They/Them"); currently not implemented

    cy.get(".friends-container").should("contain", "Your friends");

    cy.get(".about-container").should("contain", "About me");
    cy.get(".posts-container").should("contain", "Shared by you");
  });

  it("should dynamically change the profile labelling", () => {
    cy.signUp("Harry", "Harry-Harrisson", "harry@example.com", "h4rry");
    cy.signUp();
    cy.login();

    cy.get("#searchBox").type("Harry Harry-Harrisson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();

    cy.get(".friends-container").should("contain", "Harry's friends");
    cy.get(".posts-container").should("contain", "Shared by Harry");
  });

  it("should display the users posts", () => {
    cy.signUp();
    cy.login();

    cy.addPost("MEHN stack!");
    cy.addPost("Testing is so fun!");
    cy.addPost("Baddiez don't test!");

    cy.get("#dropdownSessionUser").click();
    cy.get("#dropdown-profile-link").click();

    cy.get(".message").should("contain", "Baddiez don't test!");
    cy.get(".message").should("contain", "Testing is so fun!");
    cy.get(".message").should("contain", "MEHN stack!");
  });

  it("should have an add friend button unless profile owner", () => {
    cy.signUp();
    cy.login();

    cy.get("#dropdownSessionUser").click();
    cy.get("#dropdown-profile-link").click();
    cy.get("#friend-unfriend-button").should("not.exist");

    cy.get("#dropdownSessionUser").click();
    cy.get("#sign-out-button").click();
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();

    cy.get("#friend-unfriend-button").should("exist");
  });

  it("should have a remove friend button if already friends", () => {
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");

    cy.signUp();
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();

    cy.get("#friend-unfriend-button").click(); //Now they're a friend

    cy.get("#friend-unfriend-button").should("contain", "Unfriend");
    cy.get("#friend-unfriend-button").click();

    cy.get("#friend-unfriend-button").should("contain", "Add friend");
    cy.get("#friend-name").should("not.exist");
  });

  it("should add a friend and list the friend on the users profile", () => {
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");

    cy.signUp();
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();

    cy.get("#friend-unfriend-button").click();

    cy.get(".friend-name").should("contain", "Barry Barry-Barroldsson");

    cy.get("#dropdownSessionUser").click();
    cy.get("#dropdown-profile-link").click();

    cy.get(".friend-name").should("contain", "Rick Rick-Rickinsson");
  });
});
