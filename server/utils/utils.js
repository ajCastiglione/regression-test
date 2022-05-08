const axios = require("axios");

const getPageUrls = async (api, labelSelector) => {
  // API URL
  const API = `${api}?per_page=100`;

  // Fetch pages.
  const { data } = await axios.get(API);

  // Format data.
  const pages = data.map((page) => {
    return {
      url: page.url,
      label: page[labelSelector],
    };
  });

  return pages;
};

const addScenarios = (pages, config) => {
  for (let page of pages) {
    //   Check if scenario already exists for page url.
    const existingScenario = config.scenarios.find((scenario) => scenario.url === page.url);

    // IF the scenario doesn't exist, add it to the config.
    if (!existingScenario) {
      // Add new scenario to the backstop configuration file.
      config.scenarios.push({
        label: page.label,
        url: page.url,
        delay: 2000,
        removeSelectors: [".pum-overlay", ".back-to-top", ".needsclick"],
        selectorExpansion: true,
        selectors: ["document"],
      });
    }
  }

  return config;
};

module.exports = {
  getPageUrls,
  addScenarios,
};
