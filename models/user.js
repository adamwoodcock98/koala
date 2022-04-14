const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
    validate: [
      { validator: validator.isEmail, message: 'Invalid Email' },
      { validator: async function(email) {
        const user = await this.constructor.findOne({ email });
        return !!!user;
      }, message: 'Email already exists' }
    ]
  },
  password: {
    type: String,
    required: true
  },
  posts: {
    type: [mongoose.SchemaTypes.ObjectId]
  }
});

const User = mongoose.model("User", UserSchema);

// async function isUnique(email) {
//   const user = await UserSchema.findOne( { email });
//   return !!user;
// }


module.exports = User;
