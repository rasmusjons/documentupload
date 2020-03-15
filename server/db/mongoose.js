const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017";

mongoose.connect(connectionURL + "/documents-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
