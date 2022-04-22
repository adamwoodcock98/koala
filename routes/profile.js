const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/:userID", ProfileController.Index);
router.get("/:userID/edit", ProfileController.Index);
router.post("/:userID/edit", ProfileController.Update);
router.get("/user/:userID/edit", ProfileController.Index);
router.post("/user/:userID/edit", ProfileController.Change);

module.exports = router;
