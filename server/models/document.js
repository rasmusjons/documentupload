const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  file: {
    type: Buffer
  }
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
