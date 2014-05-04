
(function(){
  'use strict';

  if($('#artist-email').text().length > 0){
    $('#logout').toggleClass('hidden');
  }else{
    $('#login').toggleClass('hidden');
    $('#email').toggleClass('hidden');
    $('#password').toggleClass('hidden');
    $('#register').toggleClass('hidden');
    $('.fb-login-button').toggleClass('hidden');
  }
})();
