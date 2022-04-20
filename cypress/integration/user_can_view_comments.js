describe("Viewing comments", () => {
  it("A signed in user sees comments that a post has on /posts", () => {
    cy.signUp();
    cy.login();
    cy.addPost("MEHN stack!");

    const commentBody = "What excellent content this is";
    // TODO: Extract the posting a comment into a helper method
    // cy.addComment(commentBody);

    cy.get(".post-container")
      .get(".post-footer")
      .get(".comment-input")
      .type(commentBody);

    cy.get(".post-container")
      .get(".post-footer")
      .get(".comment-submit")
      .click();

    cy.get(".message").should("contain", "MEHN stack!");
    cy.get(".comments-list")
      .first()
      .get(".comment-body")
      .should("contain", "What excellent content this is");
  });
});
