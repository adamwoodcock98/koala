const express = require("express");
const router = express.Router();
const PostCommentsController = require("../controllers/post_comments");

router.post("/new", PostCommentsController.Create);
router.post("/:commentId/likes/:commentLikeId", PostCommentsController.AddLike);
router.delete("/delete/:commentId/:likeId", PostCommentsController.RemoveLike);

module.exports = router;
