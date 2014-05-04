/* global io */

(function(){
  'use strict';

  $(document).ready(init);

  var socket;

  function init(){
    var chat = $('#chat').length;

    if(chat){
      $('#send').click(sendMessage);
      socket = io.connect('/app');
      socket.on('online', online);
      socket.on('showname', showName);
      socket.on('showmessage', showMessage);
      changeBackground();
    }
  }

  function changeBackground(){
    $('body').css({
      'background-image': 'url("/img/chat-guitar.jpg")',
      'background-size': 'cover',
      'background-attachment': 'fixed'
    });
  }

  function sendMessage(){
    var email = $('#artist-email').text() || 'Anonymous';
    var message = $('#message').val();
    socket.emit('message', {email:email, message:message});
    $('#message').val('');
    $('#message').focus();
  }

  function showMessage(data){
    $('#messages').prepend('<div class=message><span class=sender>'+data.email+':</span><span class=msg>'+data.message+'</span></div>');
  }

  function sendName(){
    var email = $('#artist-email').text() || 'Anonymous';
    socket.emit('register', {email:email});
  }

  function showName(data){
    var users = data.emails.map(function(e){return '<div class=user>' + e + '</div>';});
    $('#users').empty().append(users);
  }

  function online(){
    sendName();
    console.log('Connected to Node.js');
  }
})();
