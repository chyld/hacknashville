'use strict';

var util = require('util');

module.exports = function(req, res, next){
  console.log('//----------------------------------------------//');
  util.log('request received [params, query, body]');
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  next();
};
