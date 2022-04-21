const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.patch("/add/:userID", FriendsController.Request);
router.post("/confirm/:userId/notification/:notificationId", FriendsController.Confirm)

module.exports = router;

