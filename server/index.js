const express = require("express");
require("./db/mongoose");
const documentRouter = require("../server/routers/document");
const history = require("connect-history-api-fallback");

const app = express();
const port = process.env.PORT;

app.use(express.json());

const staticFileMiddleware = express.static(__dirname, "dist");
app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);
app.use(staticFileMiddleware);

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", process.env.VUE_PORT);
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  next();
});

app.use(documentRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
