const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.patch("/add/:userID", FriendsController.Update);

module.exports = router;

