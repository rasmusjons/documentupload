const express = require("express");
const Document = require("../models/document");
const router = new express.Router();
const upload = require("../middleware/upload");

router.post(
  "/documents",
  upload.single("document"),
  async (request, resolve) => {
    const document = new Document({
      file: request.file.buffer
    });

    try {
      await document.save();
      resolve.status(201).send({ document });
    } catch (e) {
      resolve.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    res.status(406).send({ error: error.message });
  }
);

router.get("/documents", async (request, resolve) => {
  try {
    const documentList = await Document.findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    resolve.set("Content-Type", "text/plain");

    const buffer = Buffer.from(documentList.file);
    const doc = buffer.toString("utf8");

    resolve.status(200).send(doc);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = router;
