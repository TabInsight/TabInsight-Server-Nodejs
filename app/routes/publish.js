var express = require('express');
var router = express.Router();
var csv_writter = require("fast-csv");

var LOG_DIR = '/var/tabinsight/data/'

function createLogFile(){

}


router.get('/', function(req, res) {
  res.render('index', { title: 'TabInsight API' });
});

router.post('/log', function(req,res){
  /*
    sample request:
    {"device": "xyz", "access_time": "123", "app_name": "abc", "usetime": "1"}
  */
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');
  res.send(user_id + ' ' + token + ' ' + geo);
});

router.post('/logs', function(req,res){
  res.render('index', { title: 'Multiple log Service!' });
});


module.exports = router;
