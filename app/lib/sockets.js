/* global _:true */

'use strict';

var _ = require('lodash');
var emails = [];

exports.connection = function(socket){
  socket.emit('online');
  socket.on('register', register);
  socket.on('message', message);
};

function register(data){
  var socket = this;

  emails.push(data.email);
  emails = _(emails).uniq().value();

  socket.emit('showname', {emails:emails});
  socket.broadcast.emit('showname', {emails:emails});
}

function message(data){
  var socket = this;

  socket.emit('showmessage', data);
  socket.broadcast.emit('showmessage', data);
}
