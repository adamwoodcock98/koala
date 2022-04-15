const mongoose = require("mongoose");
const validator = require("validator");

const aboutMeSchema = new mongoose.Schema({
  education: String,
  workplace: String,
  relationshipStatus: String,
  pronouns: String,
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [
      { validator: validator.isEmail, message: "Invalid Email" },
      {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          return !user;
        },
        message: "Email already exists",
      },
    ],
  },
  password: {
    type: String,
    required: true,
  },
  friends: [mongoose.SchemaTypes.ObjectId],
  aboutMe: aboutMeSchema,
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
