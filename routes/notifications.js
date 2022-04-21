const express = require("express");
const router = express.Router();

const NotificationsController = require("../controllers/notifications");

router.get("/", NotificationsController.Index);

module.exports = router;