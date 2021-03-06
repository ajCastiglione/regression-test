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
    backstop("reference", { config: req.configurationFile });

    setTimeout(() => {
      console.log("Stalling so Heroku doesn't timeout...");

      // Send user notification that screenshots are being generated.
      res.status(200).send({
        message: "Reference screenshots are being captured.",
      });
    }, 15000);
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
    backstop("test", { config: req.configurationFile });

    setTimeout(() => {
      console.log("Stalling so Heroku doesn't timeout...");

      // Send user a message letting them know the test was ran.
      res.status(200).send({
        message: `Visit ${req.protocol}://${req.get("host")}/report to view the differences.`,
      });
    }, 15000);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = { captureScreenshots, compareScreenshots };
