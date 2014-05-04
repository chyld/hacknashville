'use strict';

var Artist = require('../models/artist');
//var Mongo = require('mongodb');

exports.register = function(req, res){
  var artist = new Artist(req.body);
  artist.hashPassword(function(){
    artist.insert(function(){
      if(artist._id){
        req.session.artistId = artist._id;
        res.send({status:1});
      }else{
        res.send({status:0});
      }
    });
  });
};

exports.login = function(req, res){
  Artist.findByEmailAndPassword(req.body.email, req.body.password, function(artist){
    if(artist){
      req.session.artistId = artist._id;
      req.session.artistPw = artist.password;
      res.send({status:1});
    }else{
      res.send({status:0});
    }
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

exports.show = function(req, res){
  Artist.findById(req.params.id.toString(),function(artist){
    if(req.session.artistId === req.params.id){
      res.render('artists/show', {artist:artist, owner:true});
    }else{
      res.render('artists/show', {artist:artist, owner:false});
    }
  });
};

exports.edit = function(req, res){
  res.render('artists/edit');
};

exports.submit = function(req, res){
  Artist.findById(req.session.artistId, function(artist){
    artist.name = req.body.name;
    artist.address = req.body.address;
    artist.coordinates = [req.body.lat * 1, req.body.lng * 1];
    artist.bio = req.body.bio;
    artist.update(function(){
      res.redirect('/artists/' + req.session.artistId);
    });
  });
};

exports.addPhoto = function(req, res){
  Artist.findById(req.session.artistId, function(artist){
    console.log(req.files);
    artist.addPhoto(req.files.artistPhoto.path, function(){
      res.redirect('/artists/' + req.session.artistId);
    });
  });
};
