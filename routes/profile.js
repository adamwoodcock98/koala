const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/posts");

router.get("/", ProfileController.Index);

module.exports = router;
