const User = require("../models/user");

const SearchController = {
  Index: (req, res) => {
    User.find().then((users) => {
      const handlebarsObject = {
        sessionUser: req.session.user,
        data: {
          users: users,
        },
      };
      res.render("search/index", handlebarsObject);
    });
  },
  Create: (req, res) => {
    const searchArray = req.body.message.replace(/[\W_]+/g, " ").split(/[ ,]+/);
    const findQuery = [];
    searchArray.forEach((name) => {
      findQuery.push({ firstName: { $regex: name, $options: "i" } });
      findQuery.push({ lastName: { $regex: name, $options: "i" } });
    });

    User.find({ $or: findQuery }).then((users) => {
      const handlebarsObject = {
        sessionUser: req.session.user,
        data: {
          users: users,
        },
      };
      res.render("search/index", handlebarsObject);
    });
  },
};

module.exports = SearchController;
