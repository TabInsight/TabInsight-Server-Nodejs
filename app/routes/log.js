var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Single log Service!' });
});

router.post('/publish/log', function(req,res){
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  
  res.send(user_id + ' ' + token + ' ' + geo);
});

module.exports = router;