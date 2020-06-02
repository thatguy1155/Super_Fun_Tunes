// In the multer.js file, we start by setting up a folder where all the 
// uploaded music files will be uploaded. We need to make this file static 
// by defining that in the index.js file:


let multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
     file.mimetype === "audio/mpeg" ||
     file.mimetype === "audio/wave" ||
     file.mimetype === "audio/wav" ||
     file.mimetype === "audio/mp3"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 2048 * 1024 * 5
  },
  fileFilter: fileFilter
});