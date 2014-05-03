(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#register').click(register);
    $('#login').click(login);
  }

  function login(e){
    var data = $('#authentication').serialize();
    $.ajax({url:'/login', type:'POST', data:data, success:function(d){
      // take response and redraw UI
    }});

    e.preventDefault();
  }

  function register(e){
    var data = $('#authentication').serialize();
    $.ajax({url:'/register', type:'POST', data:data, success:function(d){
      // take response and redraw UI
    }});

    e.preventDefault();
  }
})();
