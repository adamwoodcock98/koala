const express = require("express");
const router = express.Router();

const NotificationsController = require("../controllers/notifications");

router.get("/", NotificationsController.Index);
router.delete("/delete/:notificationID", NotificationsController.Delete);

module.exports = router;