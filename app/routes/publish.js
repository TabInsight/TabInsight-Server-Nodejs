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
  var use_time = req.body.use_time;
  var filename = LOG_DIR + deviceid.split(':').join('_') + ".csv"
  var csvStream = csv_writter.createWriteStream({headers: false}),
  writableStream = fs.createWriteStream(filename);
  
  writableStream.on("finish", function(){
    console.log("CSV File written! LogStash Crunching!");
    res.sendStatus(200);
  });
  csvStream.pipe(writableStream);
  csvStream.write({device: deviceid, access_time: accesstime, app_name: appname.split(' ').join('_'), use_time:use_time});
  csvStream.end()
  
});

router.post('/logs', function(req,res){
  if (!req.body) return res.sendStatus(400)
  var post_data = req.body;
  var status = false;  
  post_data.forEach(function (item){
    var deviceid = item.device;
    var accesstime = item.access_time;
    var appname = item.app_name;
    var use_time = item.use_time;
    var filename = LOG_DIR + deviceid.split(':').join('_')+ ".csv"
    var csvStream = csv_writter.createWriteStream({headers: false}),
    writableStream = fs.createWriteStream(filename);
    csvStream.pipe(writableStream);
    csvStream.write({device: deviceid, access_time: accesstime, app_name: appname.split(' ').join('_'), use_time:use_time});
    csvStream.end()
    writableStream.on("finish", function(){
      console.log("CSV File written for single, moving to next! LogStash Crunching!");
      status = true;
    }); 
   });
   if(status) return res.sendStatus(200);
});

module.exports = router;
