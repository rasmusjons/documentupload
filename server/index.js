// Imports.
const express = require("express");
require("./db/mongoose");
const history = require("connect-history-api-fallback");
const app = express();
// Express server.
const staticFileMiddleware = express.static(__dirname);
app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);
app.use(staticFileMiddleware);
const port = process.env.PORT || 5000;
app.use(documentRouter);

app.listen(port, () => {
  console.log("App listening on port " + port);
});
