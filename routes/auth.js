var express = require('express');
var router = express.Router();

const  authController = require("../controllers/authController")

router.post("/signup",authController.signUp)
router.post("/signin",authController.signIn)

module.exports = router