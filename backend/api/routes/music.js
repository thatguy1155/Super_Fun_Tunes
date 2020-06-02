const express = require("express");
const router = express.Router();
const musicController = require("../controller/musicController");
const upload = require("../../config/multer");
router.get("/", musicController.getAllMusic);
router.post("/", upload.upload.single("music"), musicController.addNewMusic);
router.put("/:musicId", musicController.editMusic); 
router.delete("/:musicId", musicController.deleteMusic);
module.exports = router;

//here we have the music page where all routes w the '/' path are directed to functions from the musicController file