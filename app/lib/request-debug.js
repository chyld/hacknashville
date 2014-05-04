'use strict';

module.exports = function(req, res, next){
  console.log('//----------------------------------------------//');
  console.log('request received [params, query, body]');
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  next();
};
