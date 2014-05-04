/* global FB */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#register').click(register);
    $('#login').click(login);
    $('#logout').click(logout);
  }

  function login(e){
    var data = $('#authentication').serialize();
    $.ajax({url:'/login', type:'POST', data:data, success:function(artist){
      if(artist){
        $('#artist-email').text(artist.email);
        hideLogInElements();
      }
    }});

    e.preventDefault();
  }

  function logout(e){
    FB.getLoginStatus(function(response){
      if(response.status === 'connected'){
          FB.logout();
      }
    });
    $.ajax({url:'/logout', type:'DELETE', data:{}, success:function(d){
      if(d.status){
        $('#artist-email').text('');
        hideLogInElements();
      }
    }});

    e.preventDefault();
  }

  function register(e){
    var data = $('#authentication').serialize();
    $.ajax({url:'/register', type:'POST', data:data, success:function(artist){
      if(artist !== undefined){
        console.log(artist);
        $('#artist-email').text(artist.email);
        hideLogInElements();
      }
    }});

    e.preventDefault();
  }

  function hideLogInElements(){
    $('#logout').toggleClass('hidden');
    $('#login').toggleClass('hidden');
    $('#email').toggleClass('hidden');
    $('#password').toggleClass('hidden');
    $('#register').toggleClass('hidden');
    $('.fb-login-button').toggleClass('hidden');
  }
})();
