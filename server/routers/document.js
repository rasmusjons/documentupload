const express = require("express");
const Document = require("../models/document");
const router = new express.Router();
const upload = require("../middleware/upload");

router.post(
  "/documents",
  upload.single("document"),
  async (req, res) => {
    const document = new Document({
      file: req.file.buffer
    });

    try {
      await document.save();
      res.status(201).send({ document });
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    res.status(406).send({ error: error.message });
  }
);

router.get("/documents", async (req, res) => {
  try {
    const documentList = await Document.findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    res.set("Content-Type", "text/plain");

    let newBuff = Buffer.from(documentList.file);
    const doc = newBuff.toString("utf8");

    res.status(200).send(doc);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
