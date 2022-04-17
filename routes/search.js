const express = require("express");
const router = express.Router();

const SearchController = require("../controllers/search.js");

router.get("/", SearchController.Index);
router.post("/", SearchController.Create);

module.exports = router;
