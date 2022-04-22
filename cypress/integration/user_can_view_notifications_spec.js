describe("Viewing notifications", () => {
  it("Notifications page is blank if no notifications", () => {
    cy.signUp();
    cy.login();
    cy.get("#notification-link").click()
    cy.get(".notification-container").should('not.exist');
  });
  it("Notification appears for friend requests", () => {
    cy.signUp("User1", "User1", "User1@test.com", "user1");
    cy.signUp("User2", "User2", "User2@test.com", "user2");
    cy.login("User1@test.com", "user1");

    cy.get("#searchBox").type("User2");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();

    cy.get("#add-friend-button").click();

    cy.login("User2@test.com", "user2");

    cy.get("#notification-link").click()
    cy.get(".notification-message").should("contain", "User1 User1 sent you a friend request");
  });

  it("Notification for friend requests can be accepted", () => {
    cy.signUp("User1", "User1", "User1@test.com", "user1");
    cy.signUp("User2", "User2", "User2@test.com", "user2");
    cy.login("User1@test.com", "user1");

    cy.get("#searchBox").type("User2");
    cy.get("#searchButton").click();
    cy.get(".user-container").click();

    cy.get("#add-friend-button").click();

    cy.login("User2@test.com", "user2");

    cy.get("#notification-link").click();
    cy.get("#confirm-friend-request").click();

    cy.get("#confirmation-message").should("contain", "You are now friends with User1 User1")
  });

  it("Notification appears for comments", () => {

    cy.signUp("User1", "User1", "User1@test.com", "user1");
    cy.signUp("User2", "User2", "User2@test.com", "user2");
    cy.login("User1@test.com", "user1");
    
    cy.addPost("MEHN stack!");

    cy.login("User2@test.com", "user2");

    const postNumber = 0; // Index of the post being targeted
    const commentBody = "What excellent content this is";

    cy.addComment(postNumber, commentBody);

    cy.login("User1@test.com", "user1");

    cy.get("#notification-link").click()
    cy.get(".notification-message").should("contain", "User2 User2 commented on your post");
  });

  it("Notifications can be deleted", () => {
    cy.signUp("User1", "User1", "User1@test.com", "user1");
    cy.signUp("User2", "User2", "User2@test.com", "user2");
    cy.login("User1@test.com", "user1");
    
    cy.addPost("MEHN stack!");

    cy.login("User2@test.com", "user2");

    const postNumber = 0; // Index of the post being targeted
    const commentBody = "What excellent content this is";

    cy.addComment(postNumber, commentBody);

    cy.login("User1@test.com", "user1");

    cy.get("#notification-link").click()
    cy.get("#delete-notification").click()

    cy.get(".notification-container").should('not.exist');
  });
});
