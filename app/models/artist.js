'use strict';

module.exports = Artist;
var bcrypt = require('bcrypt');
var artists = global.nss.db.collection('artists');
var Mongo = require('mongodb');
var _ = require('lodash');
var fs = require('fs');
function Artist(artist){
  this.name = '';
  this.email = artist.email;
  this.password = artist.password;
  this.bio = '';
  this.address = '';
  this.artistPhoto = '';
  this.coordinates = [];
  this.skills = [];
  this.phone = '';
  this.song = '';
}

Artist.prototype.hashPassword = function(fn){
  var self = this;

  bcrypt.hash(self.password, 8, function(err, hash){
    self.password = hash;
    fn();
  });
};

Artist.prototype.insert = function(fn){
  var self = this;

  artists.findOne({email:self.email}, function(err, record){
    if(!record){
      artists.insert(self, function(err, records){
        fn();
      });
    }else{
      fn();
    }
  });
};

Artist.findByEmailAndPassword = function(email, password, fn){
  artists.findOne({email:email}, function(err, record){
    if(record){
      bcrypt.compare(password, record.password, function(err, result){
        if(result){
          fn(record);
        }else{
          fn();
        }
      });
    }else{
      fn();
    }
  });
};

Artist.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);

  artists.findOne({_id:_id}, function(err, record){
    fn(_.extend(record, Artist.prototype));
  });
};

Artist.prototype.update = function(data, fn){
  this.name = data.name;
  this.bio = data.bio;
  this.coordinates = [data.lat*1, data.lng*1];
  this.bio = data.bio;
  this.address = data.address;
  this.skills = data.skills;
  this.phone = data.phone;
  artists.save(this, function(err, record){
    fn({record:record});
  });
};

Artist.facebook = function(data, fn){
  var email = data.email || 'Email Not Provided';

  artists.findOne({id:data.id}, function(err, record){
    if(!record){
      artists.insert({id:data.id, email:email}, function(err, records){
        fn(records[0]);
      });
    }else{
      fn(record);
    }
  });
};

Artist.prototype.addPhoto = function(oldpath){
  var dirname = this.email.replace(/\W/g,'').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/artists/' + dirname;
  fs.mkdirSync(abspath + relpath);
  relpath += '/photo';
  fs.renameSync(oldpath, abspath + relpath);
  this.artistPhoto = relpath;
  artists.save(this, function(err, record){
    console.log('saved!!!!!');
  });
};

Artist.prototype.addSong = function(oldpath){
  console.log(oldpath);
  var dirname = this.email.replace(/\W/g,'').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/audios/artists/' + dirname;
  fs.mkdirSync(abspath + relpath);
  relpath += '/song';
  fs.renameSync(oldpath, abspath + relpath);
  this.artistSong = relpath;
  artists.save(this, function(err, record){
    console.log('saved!!!!!');
  });
};

Artist.prototype.createBand = function(){

};


