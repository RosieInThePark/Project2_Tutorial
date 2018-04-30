var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('joinForm', {title : '2014722030 HyunahPark : Join Form!'});
});

/*print User's input to JSON*/
router.post('/', function(req, res, next){
  console.log(req.body);
  res.json(req.body);
});
module.exports = router;
