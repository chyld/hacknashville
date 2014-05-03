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

exports.facebook = function(req, res){
  Artist.facebook(req.body, function(artist){
    req.session.artistId = artist._id;
    res.send({});
  });
};

exports.show = function(req, res){
  Artist.findById(req.params.id.toString(),function(artist){
    if(req.session.artistId === req.params.id){
      res.render('artists/show', {artist:artist, owner:true});
    }else{
      res.render('artists/show', {artist:artist, owner:false});
    }
  });
};

exports.profile = function(req, res){
  res.render('artists/profile');
};

exports.edit = function(req, res){
  res.render('artists/edit');
};
