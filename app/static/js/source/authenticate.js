/* global FB */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#register').click(register);
    $('#login').click(login);
    $('#logout').click(logout);
    $('#fblogout').click(fblogout);
  }

  function login(e){
    var data = $('#authentication').serialize();
    $.ajax({url:'/login', type:'POST', data:data, success:function(d){
      if(d.status){window.location = '/';}
    }});

    e.preventDefault();
  }

  function logout(e){
    $.ajax({url:'/logout', type:'DELETE', data:{}, success:function(d){
      if(d.status){window.location = '/';}
    }});

    e.preventDefault();
  }

  function fblogout(){
    FB.logout(function(response) {
        logout();
    });
  }

  function register(e){
    var data = $('#authentication').serialize();
    $.ajax({url:'/register', type:'POST', data:data, success:function(d){
      if(d.status){window.location = '/';}
    }});

    e.preventDefault();
  }
})();
