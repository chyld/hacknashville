'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var artists = require('../routes/artists');

  app.get('/', d, home.index);
  app.post('/register', d, artists.register);
  app.post('/login', d, artists.login);
  console.log('Routes Loaded');
  fn();
}
