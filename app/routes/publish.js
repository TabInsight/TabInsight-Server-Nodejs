var express = require('express');
var router = express.Router();
var csv_writter = require("fast-csv");
var fs  = require('fs');
var es_client = require("../lib/elasticsearchClient");
var LOG_DIR = '/var/tabinsight/data/'

function createLogFile(){

}


router.get('/', function(req, res) {
  res.render('index', { title: 'TabInsight API' });
});

router.post('/log', function(req,res){
  /*
    sample request:
    {"device": "xyz", "access_time": "123", "app_name": "abc", "use_time": "1"}
  */

  if (!req.body) return res.sendStatus(400)
  var post_data = req.body;
  var deviceid = req.body.device;
  var accesstime = new Date(Number(req.body.access_time));
  var appname = req.body.app_name;
  var use_time = Number(req.body.use_time);

  var payload = {
    "device" : deviceid,
    "app_name": appname,
    "access_time": accesstime,
    "use_time": use_time
  }
  inserRecordFunc = es_client.insertRecord;
  return inserRecordFunc(payload, res);
});

router.post('/logs', function(req,res){
  if (!req.body) return res.sendStatus(400)
  var post_data = req.body;
  var status = false;

  var filename = LOG_DIR + req.body[0].device.split(':').join('_')+ ".csv"
  var csvStream = csv_writter.createWriteStream({headers: false}),
  writableStream = fs.createWriteStream(filename);
  csvStream.pipe(writableStream);

  post_data.forEach(function (item){
    console.log(item);
    var deviceid = item.device;
    var accesstime = Number(item.access_time);
    var appname = item.app_name;
    var use_time = Number(item.use_time);

    csvStream.write({device: deviceid, access_time: accesstime, app_name: appname.split(' ').join('_'), use_time:use_time});
   });

   csvStream.end();
   writableStream.on("finish", function(){
     console.log("CSV File written! LogStash Crunching!");
     return res.sendStatus(200);
   });
});

module.exports = router;
