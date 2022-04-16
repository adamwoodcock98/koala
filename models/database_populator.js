const mongoose = require("mongoose");
const Post = require("./post");
const User = require("./user");
const AboutMe = require("./about_me.js");

mongoose.connect("mongodb://127.0.0.1/acebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

console.log(db.name);

const barrysFriends = [
  mongoose.Types.ObjectId("62596c9539f4ca6d024cee07"),
  mongoose.Types.ObjectId("62596cc70b90a16ceeaf66f1"),
  mongoose.Types.ObjectId("62596cd10b90a16ceeaf66fa"),
  mongoose.Types.ObjectId("625979737890bb083ccb43bf"),
  mongoose.Types.ObjectId("6259797f7890bb083ccb43c8"),
  mongoose.Types.ObjectId("62597a290f8ad516167bcd4d"),
];

const users = [
  {
    _id: "62596c9539f4ca6d024cee07",
    email: "test1@example.com",
    firstName: "Larry",
    lastName: "Larrysson",
    profilePicture: "/images/users/larry_larryson.jpg",
    aboutMe: "625afd523b344e8aab81d05b",
  },
  {
    _id: "62596cc70b90a16ceeaf66f1",
    email: "test2@example.com",
    firstName: "Carrie",
    lastName: "Carriesdottir",
    profilePicture: "/images/users/carrie_carriedottir.jpg",
    aboutMe: "625afd523b344e8aab81d05b",
  },
  {
    _id: "62596cd10b90a16ceeaf66fa",
    email: "test3@example.com",
    firstName: "Gary",
    lastName: "Garysson",
    profilePicture: "/images/users/gary_garyson.jpg",
    aboutMe: "625afd523b344e8aab81d05b",
  },
  {
    _id: "625979737890bb083ccb43bf",
    email: "test4@example.com",
    firstName: "Liam",
    lastName: "Liamsson",
    profilePicture: "/images/users/liam_liamson.jpg",
    aboutMe: "625afd523b344e8aab81d05b",
  },
  {
    _id: "6259797f7890bb083ccb43c8",
    email: "test5@example.com",
    firstName: "Monica",
    lastName: "Monicasdottir",
    profilePicture: "/images/users/monica_monicadottir.jpg",
    aboutMe: "625afd523b344e8aab81d05b",
  },
  {
    _id: "62597a290f8ad516167bcd4d",
    email: "test6@example.com",
    firstName: "Barold",
    lastName: "Baroldsson",
    profilePicture: "/images/users/barold_baroldson.jpg",
    aboutMe: "625afd523b344e8aab81d05b",
  },
  {
    _id: "625acd9cc936214661cf5692",
    email: "testx@example.com",
    firstName: "Barry",
    lastName: "Barry-Barroldsson",
    profilePicture: "/images/users/barry_barry-barroldsson.jpg",
    friends: barrysFriends,
    aboutMe: "625afd523b344e8aab81d05b",
  }
];

// INFO: This will currently throw an error if there is already a user with the email in the database
// This is the expected behaviour, but it does stop the subsequent loops from running so be aware
users.forEach((user) => {
  try {
    User.create({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      friends: user.friends || [],
      lastName: user.lastName,
      password: "12345",
      profilePicture: user.profilePicture,
      aboutMe: user.aboutMe,
    });
  } catch (e) {
    console.log("Caught Error:", e);
  }
});

// Create an about me
  try {
    AboutMe.create({
      education: "Barry Grammar School for Barry's",
      workplace: "MarryBarry Dating Service",
      relationshipStatus: "It's Complicated",
      pronouns: "They/Them",
    });
  } catch (e) {
    console.log("Caught Error:", e);
  }


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
