require("./db/mongoose");
const documentRouter = require("../server/routers/document");
const serveStatic = require("serve-static");

// Imports.
const express = require("express");
const history = require("connect-history-api-fallback");
const app = express();
// Express server.
app.use(serveStatic(__dirname + "/dist"));

app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);

app.use(documentRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening on port " + port);
});
