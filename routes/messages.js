const express = require("express");
const router = express.Router();

const MessagesController = require("../controllers/messages");

router.get("/", MessagesController.Index);
router.get("/:id", MessagesController.Show);
router.post("/:id", MessagesController.Create);

module.exports = router;
