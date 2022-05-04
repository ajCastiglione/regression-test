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

module.exports = {
  getPageUrls,
};
