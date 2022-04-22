const createError = require("http-errors");
const express = require("express");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const Handlebars = require("handlebars");
const flash = require("connect-flash");

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const postCommentsRouter = require("./routes/post_comments");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
const searchRouter = require("./routes/search");
const profileRouter = require("./routes/profile");
const postLikesRouter = require("./routes/post_likes");
const commentLikesRouter = require("./routes/comment_likes");
const friendsRouter = require("./routes/friends");

const app = express();

// view engine setup
const hbs = exphbs.create({
  defaultLayout: "layout",
  extname: ".hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
    ifIn: function (elem, list, options) {
      if (list.indexOf(elem) > -1) {
        return options.fn(this);
      }
      return options.inverse(this)
    },
  },
});

app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    key: "user_sid",
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use(flash());

// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

// route setup
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter);
app.use("/comments", sessionChecker, postCommentsRouter);
app.use("/likes", sessionChecker, postLikesRouter);
app.use("/comment-likes", sessionChecker, commentLikesRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/message", messagesRouter);
app.use("/search", sessionChecker, searchRouter);
app.use("/profile", sessionChecker, profileRouter);
app.use("/friends", sessionChecker, friendsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
