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
const searchRouter = require("./routes/search");
const profileRouter = require("./routes/profile");
const friendsRouter = require("./routes/friends");
const notificationsRouter = require("./routes/notifications");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "layout",
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "hbs");

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

// const generateNotification = (req, res, next) => {
//   let notification;
//   switch (req.originalUrl) {
//     case "/friends/add/":
//       notification = new Notification({category: "Friend Request", user: req.session.used._id})
//       notification.save(()=>{
//         next();
//       })
//     case "/comments/new/":
//       notification = new Notification({category: "Comment", user: req.session.used._id})
//       notification.save(()=>{
//         next();
//       })
//     default:
//       next();
//   }
// }

// route setup
app.use("/", homeRouter);
app.use("/posts", postsRouter);
app.use("/comments", sessionChecker, postCommentsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/search", sessionChecker, searchRouter);
app.use("/profile", sessionChecker, profileRouter);
app.use("/friends", sessionChecker, friendsRouter);
app.use("/notifications", sessionChecker, notificationsRouter);

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
