const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { errorMessage: req.flash("error") });
  },

  Create: (req, res) => {
    const user = new User(req.body);

    user.save()
      .then(() => {
        res.status(201).redirect("/posts");
      })
      .catch((err) => {
        if (err.code === 11000) req.flash("error", "Email already exists");
        if (err.name === "ValidationError") req.flash("error", "All fields are required");
        res.redirect("/users/new");
      })
  },
};

module.exports = UsersController;
