module.exports = async (page, scenario, vp) => {
  console.log("SCENARIO > " + scenario.label);
  await require("./clickAndHoverHelper")(page, scenario);

  // add more ready handlers here...
  await page.evaluate(async () => {
    // Set header to static so it doesn't capture incorrectly.
    document.querySelector("header.site-header").style.cssText =
      "; transform: translateY(0px); position: static;";
    document.querySelector("#content .col-full").style.cssText = "; margin-top: 0;";

    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 300;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        var popup = document.querySelector(".needsclick");

        if (popup) {
          popup.remove();
        }

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(1000);
};
