const express = require("express");
const router = express.Router();
const PostLikesController = require("../controllers/post_likes");

router.post("/new", PostLikesController.Create);
// TODO: delete route for a like
// router.delete("/remove", PostLikesController.Delete);

module.exports = router;