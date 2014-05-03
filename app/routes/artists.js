'use strict';

var Artist = require('../models/artist');

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

exports.profile = function(req, res){
  res.render('artists/profile');
};

exports.edit = function(req, res){
  res.render('artists/edit');
};

exports.submit = function(req, res){
  res.send({artist:req.body});
};

/*
User.prototype.addPhoto = function(oldpath){
  var dirname = this.email.replace(/\W/g,'').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/artists/' + dirname;
  fs.mkdirSync(abspath + relpath);

  var extension = path.extname(oldpath);
  relpath += '/photo' + extension;
  fs.renameSync(oldpath, abspath + relpath);

  this.userPhoto = relpath;
};
*/

