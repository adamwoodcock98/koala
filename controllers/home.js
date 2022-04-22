const HomeController = {
  Index: (req, res) => {
    
    const handlebarsObject = {
      sessionUser: req.session.user,
      data: {
        title: "Acebook",
      },
    };
    res.render("home/index", handlebarsObject);
  },
};

module.exports = HomeController;
