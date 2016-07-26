var express = require('express');
var https = require('https');
var http = require('http');
var morgan = require('morgan')

var weather = require('./weather');
var location = require('./location');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined'));

//routes
app.get('/locations/:search',location.search);
app.get('/locations/details/:placeid', location.details);
app.get('/weather/:latlng', weather.search);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
