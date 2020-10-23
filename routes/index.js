var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(`decode ${req.decoded.userId}`);
  res.json(req.decoded)
});

module.exports = router;
