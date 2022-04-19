describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    cy.signUp();
    cy.login();
    
    cy.addPost('Hello, world!');

    cy.get(".message").should("contain", "Hello, world!");
  });

  it("can upload and submit photos, when signed in, and view them", () => {
    cy.signUp();
    cy.login();
    
    cy.get("#img-input").type("https://png.pngtree.com/png-clipart/20190120/ourmid/pngtree-cute-ghost-ghostly-cute-ghost-halloween-halloween-ghost-png-image_493761.jpg", { force: true })
    cy.get("#new-post-form").submit();

    cy.get(".image").should("not.be.empty");
  });
});
