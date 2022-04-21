const express = require("express");
const router = express.Router();

const NotificationsController = require("../controllers/notifications");

router.get("/", NotificationsController.Index);
router.all("/delete/:notificationId", NotificationsController.Delete);

module.exports = router;