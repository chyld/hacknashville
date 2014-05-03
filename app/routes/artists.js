'use strict';

var Artist = require('../models/artist');

exports.register = function(req, res){
  var artist = new Artist(req.body);
  artist.hashPassword(function(){
    artist.insert(function(){
      res.send({});
    });
  });
};

exports.login = function(req, res){
  Artist.findByEmailAndPassword(req.body.email, req.body.password, function(artist){
    if(artist){
      req.session.artistId = artist._id;
      res.send({});
    }else{
      req.session = null;
      res.send({});
    }
  });
};
