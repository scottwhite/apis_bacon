var https = require('https');
const querystring = require('querystring');

var configs = require('./configs');

let autocompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
let placeDetailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json';


exports.search = function(req, res){
  res.set('Content-type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.params);
  let data = querystring.stringify({
    key: configs.GOOGLE_API_KEY,
    input: req.params.search,
    types: 'geocode'
  });
  let url = autocompleteUrl + '?' + data;
  let body = '';
  https.get(url , (resx) =>{
    resx.on('data',(d)=>{body +=d});
    resx.on('end', ()=>{
      res.send(body);
    })
  }).on('error', (e)=>{
    console.log(`error: ${e.message}`);
    res.json({error: 'nope'});
  });
}

exports.details = function(req, res){
  res.set('Content-type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  let data = querystring.stringify({
    key: configs.GOOGLE_API_KEY,
    placeid: req.params.placeid
  });
  let url = placeDetailsUrl + '?' + data;
  let body = '';
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
