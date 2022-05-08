// Backstop configuration file.
const asyncHandler = require("express-async-handler");
const backstopConfig = require("../../backstop.json");
const { getPageUrls, addScenarios } = require("../utils/utils");

// Set URL for testing.
const url =
  process.env.NODE_ENV === "dev"
    ? "http://gotmold.test/wp-json/navigation/v1/menu"
    : "https://gotmold.com/wp-json/navigation/v1/menu";

const updateConfig = asyncHandler(async (req, res, next) => {
  try {
    if (!req.pages) {
      // Get page URLs.
      const pages = await getPageUrls(url, "title");

      // Add pages to request object.
      req.pages = pages;
    }

    if (!req.config) {
      // Update the configuration file.
      const config = addScenarios(req.pages, backstopConfig);

      // Add config to request object.
      req.configurationFile = config;
    }

    // Continue to next request.
    next();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

module.exports = {
  updateConfig,
};
