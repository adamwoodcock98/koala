const express = require("express");
const router = express.Router();
const CommentLikesController = require("../controllers/comment_likes");

router.post("/new", CommentLikesController.Create);

module.exports = router;
