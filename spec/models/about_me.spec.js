const mongoose = require("mongoose");

require("../mongodb_helper");
const AboutMe = require("../../models/about_me.js");

describe("AboutMe model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.aboutmes.drop(() => {
      done();
    });
  });


  it("has an education me value", () => {
    const aboutMe = new AboutMe({
      education: "Barry Grammar for Barrys",
    })
    expect(aboutMe.education).toBe("Barry Grammar for Barrys");
  });

  it("has a workplace value", () => {
    const aboutMe = new AboutMe({
      workplace: "Barry X",
    })
    expect(aboutMe.workplace).toBe("Barry X");
  });

  it("has a relationship status", () => {
    const aboutMe = new AboutMe({
      relationshipStatus: "In a relationship with Barry",
    })
    expect(aboutMe.relationshipStatus).toBe("In a relationship with Barry");
  });

});