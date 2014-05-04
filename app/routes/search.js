'use strict';

//var escape = require('escape-html');
var Query = require('../models/query');

exports.show = function(req, res){
  res.render('search/show', {title: 'Search'});
};

exports.query = function(req, res){
  Query.execute(req.query, function(results){
    console.log(results);
    res.send({});
  });
};

// exports.query = function(req, res){
//   res.render('search/show', {title: 'Search'}, function(err, html){
//     res.send(escape(html));
//   });
// };
