const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const PostCommentsController = require("../controllers/post_comments");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);

module.exports = router;
