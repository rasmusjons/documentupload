const mongoose = require("mongoose");

const connectionURL =
  // "mongodb+srv://rasmus:passwordhiq@cluster0-gcjm4.mongodb.net/document-api?retryWrites=true&w=majority";
  "mongodb://127.0.0.1:27017";

mongoose.connect(connectionURL + "/documents-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
