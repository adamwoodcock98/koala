const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:postId/comments/:commentId", PostsController.AddComment);
// router.delete("/:postId/comments/:commentId", PostsController.RemoveComment);
router.post("/:postId/likes/:likeId", PostsController.AddLike);
// router.delete("/:postId/likeId", PostsController.RemoveLike);

module.exports = router;
