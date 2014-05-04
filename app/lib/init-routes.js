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
  var search = require('../routes/search');
  var message = require('../routes/message');

  app.get('/', d, home.index);
  app.post('/register', d, artists.register);
  app.post('/login', d, artists.login);
  app.del('/logout', d, artists.logout);
  app.post('/facebook', d, artists.facebook);
  app.post('/artists/photo', d, artists.addPhoto);
  app.post('/artists/song', d, artists.addSong);
  app.get('/artists/:id', d, artists.show);
  app.get('/band/edit', d, artists.editBand);
  app.get('/profile/edit', d, artists.edit);
  app.post('/profile', d, artists.update);
  app.get('/search', d, search.show);
  app.get('/query', d, search.query);
  app.get('/query/card', d, search.card);
  app.post('/message/text', d, message.text);
  app.get('/chat', d, message.chat);
  console.log('Routes Loaded');
  fn();
}
