const express = require("express");
const router = express.Router();

const { captureScreenshots } = require("../controllers/testController");

router.get("/", captureScreenshots);

module.exports = router;
