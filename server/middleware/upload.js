const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 10000000
  },
  fileFilter(request, file, callback) {
    if (!file.originalname.match(/\.(rtf|txt|md|file)$/)) {
      return callback(new Error("Please upload a txt"));
    }
    callback(undefined, true);
  }
});

module.exports = upload;
