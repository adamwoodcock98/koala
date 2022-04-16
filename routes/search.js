const express = require("express");
const router = express.Router();

const SearchController = require("../controllers/search.js");

router.get("/", SearchController.Index);

module.exports = router;
