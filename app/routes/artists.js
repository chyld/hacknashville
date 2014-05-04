'use strict';

var Artist = require('../models/artist');
var formidable = require('formidable');
var util = require('util');
//var Mongo = require('mongodb');

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

exports.update = function(req, res){
  console.log(req.body);
  Artist.findById(req.session.artistId ,function(artist){
    artist.update(req.body, function(){
      res.redirect('/artists/' + req.session.artistId);
    });
  });
};

exports.addPhoto = function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
      var photoPath = files.artistPhoto.path;
      Artist.findById(req.session.artistId, function(artist){
        artist.addPhoto(photoPath, function(){
          res.redirect('/artists/' + req.session.artistId);
        });
      });
    });
};
