const express = require("express");
const timeout = require("connect-timeout");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

// Setup middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(timeout("30s"));

// Setup routes.
app.use("/api/test", require("./routes/testRoutes"));

// Start server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
