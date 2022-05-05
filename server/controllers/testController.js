const asyncHandler = require("express-async-handler");
const backstop = require("backstopjs");
const zip = require("express-zip");
const { getPageUrls } = require("../utils/utils");

// File system handling.
const path = require("path");
const fs = require("fs");

// Backstop configuration file.
const backstopConfig = require("../../backstop.json");

// Set URL for testing.
const url =
  process.env.NODE_ENV === "dev"
    ? "http://gotmold.test/wp-json/navigation/v1/menu"
    : "https://gotmold.com/wp-json/navigation/v1/menu";

/**
 * @description Get user data
 * @route GET /api/users/me
 * @access Public
 */
const captureScreenshots = asyncHandler(async (req, res) => {
  // Get page URLs.
  const pages = await getPageUrls(url, "title");

  for (let page of pages) {
    // Add new scenario to the backstop configuration file.
    backstopConfig.scenarios.push({
      label: page.label,
      url: page.url,
      delay: 2000,
      removeSelectors: [".pum-overlay", ".back-to-top", ".needsclick"],
      selectorExpansion: true,
    });
  }

  try {
    // Run backstop reference.
    await backstop("reference", { config: backstopConfig });

    // Get file paths for test screenshots.
    const referencePath = path.join(__dirname, "../../backstop_data/bitmaps_reference");
    const files = fs.readdirSync(referencePath);

    let filePaths = [];

    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      filePaths.push({
        path: `${req.protocol}://${req.get("host")}/files/` + file,
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

module.exports = { captureScreenshots };
