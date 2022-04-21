describe("Messages", () => {
  it("loads a blank message section with choose a conversation on the index", () => {
    cy.signUp();
    cy.login();

    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();

    cy.get(".message").should("contain", "Choose a conversation");
  });

  it("displays all friends on the messages index page", () => {
    cy.signUp();
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();
    cy.get("#add-friend-button").click();
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();

    cy.get(".friend-container").should("contain", "Rick Rick-Rickinsson");
    cy.get(".friend-container").should("have.length", "1");
  });

  it("should display start a conversation with rick when going to chat with rick", () => {
    cy.signUp();
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();
    cy.get("#add-friend-button").click();
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();
    cy.get(".friend-anchor").click();

    cy.get("#message-input").should(
      "have.attr",
      "placeholder",
      "Start a conversation with Rick!"
    );
  });

  it("should be able to send a message to a friend", () => {
    cy.signUp();
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();
    cy.get("#add-friend-button").click();
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();
    cy.get(".friend-anchor").click();

    cy.get(".message-input").type("Hi Rick!");
    cy.get(".message-form").submit();

    cy.get(".my-message").should("contain", "Hi Rick!");
  });

  it("should be that sending a blank message should not send or do anything", () => {
    cy.signUp();
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();
    cy.get("#add-friend-button").click();
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();
    cy.get(".friend-anchor").click();

    cy.get(".message-form").submit();

    cy.get(".my-message").should("not.exist");
    cy.get("#message-input").should(
      "have.attr",
      "placeholder",
      "Start a conversation with Rick!"
    );
  });

  it("should be able to see a message that a friend has sent you", () => {
    cy.signUp();
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();
    cy.get("#add-friend-button").click();
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();
    cy.get(".friend-anchor").click();

    cy.get(".message-input").type("Hi Rick!");
    cy.get(".message-form").submit();

    cy.get("#dropdownUser1").click();
    cy.get("#sign-out-button").click();
    cy.login("rick@ick.com", "securer1ck");
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();
    cy.get(".friend-anchor").click();

    cy.get(".other-message").should("contain", "Hi Rick!");
  });

  it("should be able to send a message and see the message sent to you and the one you sent", () => {
    cy.signUp();
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();
    cy.get("#add-friend-button").click();
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();
    cy.get(".friend-anchor").click();

    cy.get(".message-input").type("Hi Rick!");
    cy.get(".message-form").submit();

    cy.get("#dropdownUser1").click();
    cy.get("#sign-out-button").click();
    cy.login("rick@ick.com", "securer1ck");
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();
    cy.get(".friend-anchor").click();
    cy.get(".message-input").type("Hi!");
    cy.get(".message-form").submit();

    cy.get(".my-message").should("contain", "Hi!");
    cy.get(".other-message").should("contain", "Hi Rick!");
  });

  it("should be able to click on another user and only have messages with them displayed", () => {
    cy.signUp();
    cy.signUp("Rick", "Rick-Rickinsson", "rick@ick.com", "securer1ck");
    cy.signUp("Mick", "Mick-Mickinsson", "mick@ick.com", "securem1ck");
    cy.login();

    cy.get("#searchBox").type("Rick Rick-Rickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();
    cy.get("#add-friend-button").click();
    cy.get("#searchBox").type("Mick Mick-Mickinsson");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();
    cy.get("#add-friend-button").click();
    cy.get("#dropdownUser1").click();
    cy.get("#message-dropdown").click();
    cy.get(".friend-container").contains("Rick Rick-Rickinsson").click();

    cy.get(".message-input").type("Hi Rick!");
    cy.get(".message-form").submit();

    cy.get(".friend-container").contains("Mick Mick-Mickinsson").click();
    cy.get(".message-input").type("Hi!");
    cy.get(".message-form").submit();

    cy.get(".my-message").should("contain", "Hi!");
  });
});
