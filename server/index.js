const express = require("express");
require("./db/mongoose");
const documentRouter = require("../server/routers/document");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  next();
});

app.use(documentRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
