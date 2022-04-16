const User = require("../models/user");

const SearchController = {
  Index: (req, res) => {
    const searchArray = ["Bar", "Barry", "bar"];

    const users = [];
    searchArray.forEach((name) => {
      User.find({
        firstName: { $regex: name, $options: "i" },
        lastName: { $regex: name, $options: "i" },
      }).then((user) => {
        users.push(user);
        console.log("This is just one user return", user);
        console.log("Pre reduce method", users);
      });
    });
    users.reduce((acc, val) => acc.concat(val), []);
    removeDuplicates(users);
    console.log("Post reduce method", users);
    res.render("search/index", { users: users });
  },
};

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

module.exports = SearchController;
