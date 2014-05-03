'use strict';

module.exports = Artist;
var bcrypt = require('bcrypt');
var artists = global.nss.db.collection('artists');
var Mongo = require('mongodb');

function Artist(artist){
  this.email = artist.email;
  this.password = artist.password;
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
    fn(record);
  });
};
