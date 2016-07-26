var configs = require('./configs');
var https = require('https');
const querystring = require('querystring');

let weatherUrl = 'https://api.forecast.io/forecast/'+ configs.WEATHER_API_KEY + '/'; //need lat,lng


exports.search = function(req, res){
  let latlng = req.params.latlng;
  let url = weatherUrl + latlng;
  let body='';
  res.set('Content-type', 'application/json');
  https.get(url, (resx) =>{
    resx.on('data',(d)=>{body +=d});
    resx.on('end', ()=>{
      res.send(body);
    })
  }).on('error', (e)=>{
    console.log(`error: ${e.message}`);
    res.json({error: 'nope'});
  });
}
