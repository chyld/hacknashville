'use strict';

var Artist = require('../models/artist');

exports.register = function(req, res){
  var artist = new Artist(req.body);
  artist.hashPassword(function(){
    artist.insert(function(){
      if(artist._id){
        req.session.artistId = artist._id;
        res.send(artist);
      }
    });
  });
};

exports.login = function(req, res){
  Artist.findByEmailAndPassword(req.body.email, req.body.password, function(artist){
    if(artist){
      req.session.artistId = artist._id;
    }

    res.send(artist);
  });
};

exports.logout = function(req, res){
  req.session = null;
  res.send({status:1});
};

exports.facebook = function(req, res){
  Artist.facebook(req.body, function(artist){
    req.session.artistId = artist._id;
    res.send(artist);
  });
};
