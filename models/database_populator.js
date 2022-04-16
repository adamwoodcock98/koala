const mongoose = require("mongoose");
const Post = require("./post");
const User = require("./user");

const mongoDbUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1/acebook";

mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

console.log(db.name);

const users = [
  {
    _id: "62596c9539f4ca6d024cee07",
    email: "test1@example.com",
    firstName: "Larry",
    lastName: "Larrysson",
    profilePicture: "/images/users/larry_larrysson.jpg",
  },
  {
    _id: "62596cc70b90a16ceeaf66f1",
    email: "test2@example.com",
    firstName: "Carrie",
    lastName: "Carriesdottir",
    profilePicture: "/images/users/carrie_carriesdottir.jpg",
  },
  {
    _id: "62596cd10b90a16ceeaf66fa",
    email: "test3@example.com",
    firstName: "Gary",
    lastName: "Garysson",
    profilePicture: "/images/users/gary_garysson.jpg",
  },
  {
    _id: "625979737890bb083ccb43bf",
    email: "test4@example.com",
    firstName: "Liam",
    lastName: "Liamsson",
    profilePicture: "/images/users/liam_liamsson.jpg",
  },
  {
    _id: "6259797f7890bb083ccb43c8",
    email: "test5@example.com",
    firstName: "Monica",
    lastName: "Monicasdottir",
    profilePicture: "/images/users/monica_monicasdottir.jpg",
  },
  {
    _id: "62597a290f8ad516167bcd4d",
    email: "test6@example.com",
    firstName: "Barold",
    lastName: "Baroldsson",
    profilePicture: "/images/users/barold_baroldsson.jpg",
  },
];

// INFO: This will currently throw an error if there is already a user with the email in the database
// This is the expected behaviour, but it does stop the subsequent loops from running so be aware
users.forEach((user) => {
  try {
    User.create({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      friends: [],
      lastName: user.lastName,
      password: "12345",
      profilePicture: user.profilePicture,
    });
  } catch (e) {
    console.log("Caught Error:", e);
  }
});

const messages = [
  "we iz so confused",
  "hello darkness my old friend",
  "I'm leaving Koala - follow me on Eggstagram",
  "Will the real Barry Barroldsson please stand up?",
];

messages.forEach((message) => {
  let randomUserId = users[Math.floor(Math.random() * users.length)]._id;
  const post = new Post({
    message: message,
    user: randomUserId,
    createdAt: Date.now(),
  });
  post.save();
});
