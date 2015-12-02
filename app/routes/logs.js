var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Multiple log Service!' });
});

router.post('/publish/logs', function(req,res){
	res.render('index', { title: 'Multiple log Service!' });
});
module.exports = router;