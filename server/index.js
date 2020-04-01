const express = require("express");
require("./db/mongoose");
const documentRouter = require("../server/routers/document");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();
app.use(serveStatic(path.join(__dirname, "dist")));

const port = process.env.PORT;

app.use(documentRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
