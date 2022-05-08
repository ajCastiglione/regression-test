const asyncHandler = require("express-async-handler");
const backstop = require("backstopjs");

// File system handling.
const path = require("path");
const fs = require("fs");

/**
 * @description Capture screenshots (start reference)
 * @route GET /api/test/capture
 * @access Public
 */
const captureScreenshots = asyncHandler(async (req, res) => {
  try {
    // Run backstop reference.
    await backstop("reference", { config: req.configurationFile });

    // Get file paths for test screenshots.
    const referencePath = path.join(__dirname, "../../backstop_data/bitmaps_reference");
    const files = fs.readdirSync(referencePath);

    let filePaths = [];

    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      filePaths.push({
        path: `${req.protocol}://${req.get("host")}/bitmaps_reference/` + file,
        name: file,
      });
    });

    // Send user zip files.
    res.status(200).send(filePaths);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * @description Compare screenshots (test reference)
 * @route GET /api/test/compare
 * @access Public
 */
const compareScreenshots = asyncHandler(async (req, res) => {
  try {
    // Run backstop test.
    await backstop("test", { config: req.configurationFile });

    // Send user a message letting them know the test was ran.
    res.status(200).send({
      message: "Screenshots have been compared.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = { captureScreenshots, compareScreenshots };
