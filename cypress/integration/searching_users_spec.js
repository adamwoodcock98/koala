describe("Searching users", () => {
  beforeEach(() => {
    cy.signUp();
    cy.signUp("Chris", "Coding", "chris@coding.com", "12345");
    cy.signUp("Paul", "Coding", "paul@coding.com", "12345");
    cy.signUp("Adam", "Woodcock", "adam@woodcock.com", "12345");
    cy.signUp("Kathleen", "Woodcock", "kathleen@woodcock.com", "12345");
    cy.signUp("George", "Hett", "george@hett.com", "12345");
    cy.signUp("Rob", "Oman", "rob@oman.com", "12345");
  });

  it("A user can search for other users", () => {
    cy.login();
    cy.get("#searchBox").type("george");
    cy.get("#searchButton").click();

    cy.get(".user-container").first().should("contain", "George Hett");
  });

  it("A user can search for other users by last name", () => {
    cy.login();
    cy.get("#searchBox").type("woodcock");
    cy.get("#searchButton").click();

    cy.get(".user-container").should("have.length", 2);
    cy.get(".user-container").should("contain", "Adam Woodcock");
    cy.get(".user-container").should("contain", "Kathleen Woodcock");
  });

  it("A blank search returns all users", () => {
    cy.login();
    cy.get("#searchButton").click();

    cy.get(".user-container").should("have.length", 7);
    cy.get(".user-container").should("contain", "Adam Woodcock");
    cy.get(".user-container").should("contain", "Kathleen Woodcock");
    cy.get(".user-container").should("contain", "Chris Coding");
    cy.get(".user-container").should("contain", "Paul Coding");
    cy.get(".user-container").should("contain", "Rob Oman");
    cy.get(".user-container").should("contain", "George Hett");
    cy.get(".user-container").should("contain", "Barry Barry-Barroldsson");
  });

  it("Visiting the search page without going through the search bar returns all users", () => {
    cy.login();
    cy.visit("/search");

    cy.get(".user-container").should("have.length", 7);
    cy.get(".user-container").should("contain", "Adam Woodcock");
    cy.get(".user-container").should("contain", "Kathleen Woodcock");
    cy.get(".user-container").should("contain", "Chris Coding");
    cy.get(".user-container").should("contain", "Paul Coding");
    cy.get(".user-container").should("contain", "Rob Oman");
    cy.get(".user-container").should("contain", "George Hett");
    cy.get(".user-container").should("contain", "Barry Barry-Barroldsson");
  });

  it("A search is not affected by adding non alphanumeric characters", () => {
    cy.login();
    cy.get("#searchBox").type("Chris   /.,[]   Coding");
    cy.get("#searchButton").click();

    cy.get(".user-container").should("have.length", 2);
    cy.get(".user-container").should("contain", "Chris Coding");
    cy.get(".user-container").should("contain", "Paul Coding");
  });

  it("A user's search returns results for each word", () => {
    cy.login();
    cy.get("#searchBox").type("Chris Woodcock");
    cy.get("#searchButton").click();

    cy.get(".user-container").should("have.length", 3);
    cy.get(".user-container").should("contain", "Adam Woodcock");
    cy.get(".user-container").should("contain", "Kathleen Woodcock");
    cy.get(".user-container").should("contain", "Chris Coding");
  });
});
