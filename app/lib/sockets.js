'use strict';

var users = [];

exports.connection = function(socket){
  socket.emit('online');
  socket.on('register', register);
};

function register(data){
  var socket = this;

  users.push(data);

  socket.emit('showname', {users:users});
  socket.broadcast.emit('showname', {users:users});
}
