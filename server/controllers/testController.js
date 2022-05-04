const asyncHandler = require("express-async-handler");
const backstop = require("backstopjs");
const { getPageUrls } = require("../utils/utils");

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
      delay: 0,
      hideSelectors: [],
      removeSelectors: [".pum-overlay", ".back-to-top"],
      selectorExpansion: true,
    });
  }

  try {
    // Run backstop reference.
    await backstop("reference", { config: backstopConfig });

    // Let user know the reference is being generated.
    res.status(200).send({
      message: "Reference has been generated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = { captureScreenshots };
