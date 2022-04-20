describe("Viewing comments", () => {
  it("A signed in user sees comments that a post has on /posts", () => {
    cy.signUp();
    cy.login();
    cy.addPost("MEHN stack!");

    const postNumber = 0; // Index of the post being targeted
    const commentBody = "What excellent content this is";
    // TODO: Extract the posting a comment into a helper method
    cy.addComment(postNumber, commentBody);

    // cy.get(
    //   ".post-list>.post-container>.comments-list>.comment-form>.comment-input"
    // )
    //   .eq(postNumber)
    //   .type(commentBody, { force: true });

    // cy.get(".post-list>.post-container>.comments-list>.comment-form")
    //   .eq(0)
    //   .submit();

    cy.get(".message").should("contain", "MEHN stack!");
    cy.get(".comments-list")
      .first()
      .get(".comment-body")
      .should("contain", "What excellent content this is");
  });
});
