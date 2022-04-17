const User = require("../models/user");

const SearchController = {
  Index: (req, res) => {
    const users = [];
    User.find().then((user) => {
      users.push(user);
      const merged = [].concat.apply([], users);
      const uniqueArray = merged.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
          index ===
          merged.findIndex((obj) => {
            return JSON.stringify(obj) === _value;
          })
        );
      });
      res.render("search/index", { users: uniqueArray });
    });
  },
  Create: (req, res) => {
    const searchArray = req.body.message.replace(/[\W_]+/g, " ").split(/[ ,]+/);

    searchArray.forEach((name) => {
      const users = [];
      User.find({
        firstName: { $regex: name, $options: "i" },
        // lastName: { $regex: name, $options: "i" },
      }).then((user) => {
        users.push(user);
        User.find({
          // firstName: { $regex: name, $options: "i" },
          lastName: { $regex: name, $options: "i" },
        }).then((user) => {
          users.push(user);
          const merged = [].concat.apply([], users);
          const uniqueArray = merged.filter((value, index) => {
            const _value = JSON.stringify(value);
            return (
              index ===
              merged.findIndex((obj) => {
                return JSON.stringify(obj) === _value;
              })
            );
          });
          res.render("search/index", { users: uniqueArray });
        });
      });
    });
  },
};

module.exports = SearchController;
