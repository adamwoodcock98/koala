const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "KOALA" });
  },
};

module.exports = HomeController;
