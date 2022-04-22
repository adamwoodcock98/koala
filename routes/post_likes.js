const express = require("express");
const router = express.Router();
const PostLikesController = require("../controllers/post_likes");

router.post("/new", PostLikesController.Create);
router.delete("/remove/:postId", PostLikesController.Delete);

module.exports = router;