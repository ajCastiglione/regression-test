const asyncHandler = require("express-async-handler");
const backstop = require("backstopjs");
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
      removeSelectors: [".pum-overlay", ".back-to-top"],
      selectorExpansion: true,
    });
  }

  // Get reference screenshots.
  const referencePath = path.join(__dirname, "../../backstop_data/bitmaps_reference");
  const files = fs.readdirSync(referencePath);

  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    console.log(file);
  });

  try {
    // Run backstop reference.
    backstop("reference", { config: backstopConfig }).then(() => {});

    // Let user know the reference is being generated.
    res.status(200).send({
      message: "Reference is being generated...",
      pages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = { captureScreenshots };
