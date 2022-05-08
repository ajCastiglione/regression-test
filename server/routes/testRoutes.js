const express = require("express");
const router = express.Router();
const { updateConfig } = require("../middleware/updateConfig");

const { captureScreenshots, compareScreenshots } = require("../controllers/testController");

router.get("/capture", updateConfig, captureScreenshots);
router.get("/compare", updateConfig, compareScreenshots);

module.exports = router;
