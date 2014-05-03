/* jshint unused: true */
/* global FB: true */


function statusChangeCallback(response) {
  if (response.status === 'connected') {
    authenticate();
  } else if (response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '{284730141702291}',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    if (response.status === 'connected'){
    }
  });

};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=284730141702291&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// SEND INFO TO SERVER //
function authenticate() {
  FB.api('/me', function(response) {
    console.log(response);
    debugger;
    var url = window.location.origin + '/login';
    var data = response.email;
    var type = 'POST';
    $.ajax({url:url, type:type, data:data});
  });
}
