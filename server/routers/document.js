const express = require("express");
const multer = require("multer");
const Document = require("../models/document");
const router = new express.Router();

// router.post("/documents", async (req, res) => {
//   const document = new Document(req.body);

//   try {
//     await document.save();
//     res.status(201).send(document);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

const upload = multer({
  limits: {
    fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(rtf|txt|md|file|doc|docx)$/)) {
      return cb(new Error("Please upload a txt"));
    }
    cb(undefined, true);
  }
});

// router.use(function(req, res, next) {
//   res.set("Content-Type", "text/plain");
//   res.set("Content-Type", "text/plain");
//   next();
// });

router.post(
  "/documents",
  upload.single("document"),
  async (req, res) => {
    console.log(req.file);
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
    const documentList = await Document.find({});
    const lastDocument = documentList[documentList.length - 1];
    res.set("Content-Type", "text/plain");
    // res.set("Content-Type", "application/rtf");

    let newBuff = Buffer.from(lastDocument.file);
    console.log(newBuff);
    const hej = newBuff.toString("utf8");
    console.log(hej);

    // res.send(newBuff);
    res.status(200).send(hej);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
