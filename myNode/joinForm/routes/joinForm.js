var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('joinForm', {title : '2014722030 HyunahPark : Join Form!'});
});

module.exports = router;
