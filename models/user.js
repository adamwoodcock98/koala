const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const salt_work_factor = 10;

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
  aboutMe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AboutMe",
  },
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(salt_work_factor, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
