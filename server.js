'use strict';

var http = require('http');
var port = process.env.PORT || 3001;
const Prometheus = require('prom-client');

// Variables
const api = "http://mcapi.us/server/status?ip=52.147.29.192";

const usersTotal = new Prometheus.Counter({
  name: 'users_total',
  help: 'Total number of users',
  labelNames: ['user_method']
});

const usersCapacity = new Prometheus.Counter({
  name: 'users_capacity',
  help: 'Capacity',
  labelNames: ['user_capacity']
});

function getJson(response) {

  http.get(api, function (res) {
    res.on('data', function (data) {
      var json = JSON.parse(data);
      console.log(json);

      usersTotal.inc({
        user_method: json.players.now
      });

      usersCapacity.inc({
        user_capacity: json.players.max
      });

      //response.write(JSON.stringify(json));
      response.end(Prometheus.register.metrics());
    });
  }).on('error', function (e) {
    console.log("Got an error: ", e);
  });
}

http.createServer(function (req, res) {

  if (req.url == "/metrics") {
    res.writeHead(200, { 'Content-Type': Prometheus.register.contentType });
    getJson(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome');
  }
  
}).listen(port);