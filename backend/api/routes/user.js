const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
router.get("/", userController.getUser);
router.post("/add", userController.addNewUser);
router.post("/login", userController.login);
router.get("/me", userController.getUserByToken);
router.put("/pw", userController.changePassword) 
module.exports = router;

//here we have the music page where all routes w the '/user' path are directed to functions from the userController file