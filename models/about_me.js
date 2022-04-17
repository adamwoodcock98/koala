const mongoose = require("mongoose");


const aboutMeSchema = new mongoose.Schema({
  education: String,
  workplace: String,
  relationshipStatus: String,
  pronouns: String,
});

const AboutMe = mongoose.model("AboutMe", aboutMeSchema);

module.exports = AboutMe;