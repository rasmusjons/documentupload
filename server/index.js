require("./db/mongoose");
const documentRouter = require("../server/routers/document");

// Imports.
const express = require("express");
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

app.get("/", function(request, response) {
  response.send("Hello World!");
});

app.use(documentRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening on port " + port);
});
