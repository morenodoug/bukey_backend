var express = require('express');
const { getChatList, getProfile } = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */


router.get("/chatlist",getChatList)
router.get("/profile", getProfile)
module.exports = router;
