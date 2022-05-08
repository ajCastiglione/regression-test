module.exports = async (page, scenario, vp) => {
  console.log("SCENARIO > " + scenario.label);
  await require("./clickAndHoverHelper")(page, scenario);

  // add more ready handlers here...
  await page.evaluate(async () => {
    // Set header to static so it doesn't capture incorrectly.
    document.querySelector("header.site-header").style.cssText =
      "; transform: translateY(0px) !important; position: static !important; margin-bottom: 12px !important; height: 105px !important;";
    document.querySelector("#content .col-full").style.cssText = "; margin-top: 12px !important;";

    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 400;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        var popup = document.querySelector(".needsclick");

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          if (popup) {
            popup.style.display = "none";
            console.log("Popup Found: " + popup);
            popup.remove();
          }
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(800);
};
