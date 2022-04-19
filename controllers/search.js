const User = require("../models/user");

const SearchController = {
  Index: (req, res) => {
    User.find().then((users) => {
      res.render("search/index", { users: users });
    });
  },
  Create: (req, res) => {
    const searchArray = req.body.message.replace(/[\W_]+/g, " ").split(/[ ,]+/);
    const findQuery = [];
    searchArray.forEach((name) => {
      const first = { firstName: { $regex: name, $options: "i" } };
      const second = { lastName: { $regex: name, $options: "i" } };
      findQuery.push(first, second);
    });

    User.find({ $or: findQuery }).then((users) => {
      res.render("search/index", { users: users });
    });
  },
};

module.exports = SearchController;
