const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

// Setup middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  console.log("/test Endpoint hit");
  res.send("API is running");
});

// Setup routes.
app.use("/api/test", require("./routes/testRoutes"));

// Set static route so user can access the files.
app.use("/report", express.static(path.join(__dirname, "../backstop_data/html_report")));
app.use("/bitmaps_test", express.static(path.join(__dirname, "../backstop_data/bitmaps_test")));
app.use(
  "/bitmaps_reference",
  express.static(path.join(__dirname, "../backstop_data/bitmaps_reference"))
);

// Start server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
