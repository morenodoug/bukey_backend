const express = require('express');
const router = express.Router();
const  userController = require("../controllers/userController")

/* GET home page. */
router.post('/',  userController.user);

module.exports = router;
