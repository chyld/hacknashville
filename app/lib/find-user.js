'use strict';

module.exports = function(req, res, next){
  var Artist = require('../models/artist');

  Artist.findById(req.session.artistId, function(artist){
    res.locals.artist = artist;
    next();
  });
};
