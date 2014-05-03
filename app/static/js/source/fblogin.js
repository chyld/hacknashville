/* global FB */
/* jshint unused:false */

function statusChangeCallback(response) {
  'use strict';
  if (response.status === 'connected') {
    authenticate();
  }
}

function checkLoginState() {
  'use strict';
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  'use strict';
  FB.init({
    appId      : '{284730141702291}',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  'use strict';
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=284730141702291&version=v2.0';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// SEND INFO TO SERVER //
function authenticate() {
  'use strict';
  FB.api('/me', function(response) {
    $.ajax({url:'/facebook', type:'POST', data:response, success:function(artist){
      document.getElementById('artist-email').innerHTML = artist.email;
    }});
  });
}
