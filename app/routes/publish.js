var express = require('express');
var router = express.Router();
var csv_writter = require("fast-csv");
var fs  = require('fs');
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
  if (!req.body) return res.sendStatus(400)
  var post_data = req.body;
  var deviceid = req.body.device;
  var accesstime = req.body.access_time;
  var appname = req.body.app_name;
  var use_time = req.body.usetime;
  var filename = LOG_DIR + deviceid + ".csv"
  var csvStream = csv_writter.createWriteStream({headers: false}),
  writableStream = fs.createWriteStream(filename);
  
  writableStream.on("finish", function(){
    console.log("CSV File written! LogStash Crunching!");
  });
  csvStream.pipe(writableStream);
  csvStream.write({device: deviceid, access_time: accesstime, app_name: appname.split(' ').join('_'), usetime:use_time});
  csvStream.end()
});

router.post('/logs', function(req,res){
  res.render('index', { title: 'Multiple log Service!' });
});


module.exports = router;
