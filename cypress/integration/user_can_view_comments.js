describe("Viewing comments", () => {
  it("A signed in user sees comments that a post has on /posts", () => {
    cy.signUp();
    cy.login();
    cy.addPost("MEHN stack!");

    const postNumber = 0; // Index of the post being targeted
    const commentBody = "What excellent content this is";

    cy.addComment(postNumber, commentBody);

    cy.get(".message").should("contain", "MEHN stack!");
    cy.get(".comments-list")
      .first()
      .get(".comment-body")
      .should("contain", "What excellent content this is");
  });
});
