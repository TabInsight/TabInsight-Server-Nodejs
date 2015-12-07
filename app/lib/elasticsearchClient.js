var http = require('http');
var config = require('../config/elasticsearch.json');
var request = require('request-json');

var client = {
  getIndexName: function(){
    return getIndexNameFunc();
  },

  insertRecord: function(payload, response){
    var client = request.createClient(config.host);
    url = getIndexNameFunc() + "/record/"
    return client.post(url, payload, function(err, res, body) {
      if(err){
        console.log(err);
        response.statusCode = "400"
        return response.json({ message: "Failed to write to elastic search "
                        });
      }
      console.log(res);
      response.statusCode = "201"
      return response.json({ message: "Record creation succeeded"
                      });
    });
  }
};

function getIndexNameFunc(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  index_name= config.index_prefix + "-" + year + "." + month + "." + day;
  console.log(index_name);

  return index_name;
}

module.exports = client;
