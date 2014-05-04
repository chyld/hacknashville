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
  app.del('/logout', d, artists.logout);
  app.post('/facebook', d, artists.facebook);
  app.post('/artists/photo', d, artists.addPhoto);
  app.get('/artists/:id', d, artists.show);
  app.get('/profile/edit', d, artists.edit);
  app.post('/profile', d, artists.update);
  console.log('Routes Loaded');
  fn();
}
