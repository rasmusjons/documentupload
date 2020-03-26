const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(rtf|txt|md|file)$/)) {
      return cb(new Error("Please upload a txt"));
    }
    cb(undefined, true);
  }
});

module.exports = upload;
