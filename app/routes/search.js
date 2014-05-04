'use strict';

var Query = require('../models/query');

exports.show = function(req, res){
  res.render('search/show', {title: 'Search'});
};

exports.query = function(req, res){
  Query.execute(req.query, function(results){
    res.send({artists:results});
  });
};

exports.card = function(req, res){
  Query.card(req.query, function(result){
    res.render('search/card', result, function(err, html){
      res.send(html);
    });
  });
};
