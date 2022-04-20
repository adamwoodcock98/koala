const express = require("express");
const router = express.Router();
const PostCommentsController = require("../controllers/post_comments");

router.post("/new", PostCommentsController.Create);

module.exports = router;
