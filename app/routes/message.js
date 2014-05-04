'use strict';

exports.text = function(req, res){
  var accountSid = 'ACd217abbc48de88f1ce72d827bf396373';
  var authToken = 'd0061f15958dc28390dd7bb3698a290b';

  var client = require('twilio')(accountSid, authToken);
  var fromName = res.locals.artist.email;
  var message = 'Timbre: ' + fromName + ' wants to contact you. Please login to Timbre to connect.';

  client.messages.create({
  	to: req.body.number,
  	from: '+19177461483',
  	body: message,
  }, function(err, message) {
    res.send({});
  });
};
