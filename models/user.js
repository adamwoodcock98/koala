const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const salt_work_factor = 10;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  aboutMe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AboutMe",
  },
  profilePicture: {
    type: String,
    default:
      "/images/koala.jpg",
  },
  coverPicture: {
    type: String,
    default: "/images/koala-banner-2.jpeg",
  },
  pronouns: {
    type: String,
    default: "Add pronouns"
  }
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
