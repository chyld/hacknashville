/* global io */

(function(){
  'use strict';

  $(document).ready(init);

  var socket;

  function init(){
    var chat = $('#chat').length;

    if(chat){
      socket = io.connect('/app');
      socket.on('online', online);
      socket.on('showname', showName);
    }
  }

  function sendName(){
    var email = $('#artist-email').text() || 'Anonymous';
    socket.emit('register', {email:email});
  }

  function showName(data){
    var users = data.users.map(function(u){return '<div class=user>' + u.email + '</div>';});
    $('#users').empty().append(users);
  }

  function online(){
    sendName();
    console.log('Connected to Node.js');
  }
})();
