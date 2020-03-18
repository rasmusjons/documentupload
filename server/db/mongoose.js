const mongoose = require("mongoose");

const connectionURL =
  "mongodb+srv://rasmus:passwordhiq@cluster0-gcjm4.mongodb.net/document-api?retryWrites=true&w=majority";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
