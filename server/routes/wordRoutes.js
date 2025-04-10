// server/routes/wordRoutes.js
const express = require("express");
const router = express.Router();
const { getWord } = require("../controllers/wordController.js");

router.get("/", getWord);

module.exports = router;
