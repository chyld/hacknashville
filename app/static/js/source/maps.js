/* global google */

(function(){
  'use strict';

  $(document).ready(init);

  var map;
  var loc = {};
  var markers = [];

  function init(){
    var isMap = $('#map').length;

    if(isMap){
      $('#geolocate').click(geolocate);
      $('#geocode').click(geocode);
      $('#search').click(search);
      $('#cards').on('click', '.smsText', text);
      $('#cards').on('click', '.sendEmail', email);
      displayMap(36,-95,3);
      displaySlider();
    }
  }

  function email(){
    
  }

  function text(){
    var number = $(this).find('.smsNumber').text();
    $.ajax({url:'/message/text', type:'POST', data:{number:number}, success:function(){}});
  }

  function search(e){
    var skills = [];
    var distance = $('#range-slider').val();
    var data = {distance:distance, skills:skills, loc:loc};

    $('#skills :checked').each(function(idx, cb){
      skills.push(cb.name);
    });

    $.ajax({url:'/query', type:'GET', data:data, success:function(d){
      markers.forEach(function(marker){
        marker.setMap(null);
      });

      markers = [];

      d.artists.forEach(function(artist){
        addMarker(artist.coordinates[0], artist.coordinates[1], artist.email);
      });
    }});

    e.preventDefault();
  }

  function displaySlider(){
    $('#range-slider').noUiSlider({
	    start: 10,
	    range: {'min': 1,'max': 100},
      serialization: {
		    lower: [$.Link({target: $('#range-output')})],
		    format: {decimals: 0, mark: ','}
	    }
    });
  }

  function displayMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function geolocate(){
    var options = {enableHighAccuracy: true, timeout: 60000, maximumAge: 0};
    navigator.geolocation.getCurrentPosition(function(p){centerMap(p.coords.latitude, p.coords.longitude);}, function(e){console.log(e);}, options);
  }

  function geocode(){
    var zipcode = $('#zipcode').val();
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({address: zipcode}, function(results, status){
      if(status === 'OK'){
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        centerMap(lat, lng);
      }
    });
  }

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP});
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', getCard);
  }

  function getCard(){
    var email = this.title;

    $.ajax({url:'/query/card', type:'GET', data:{email:email}, dataType:'html', success:function(card){
      $('#cards').prepend(card);
    }});
  }

  function centerMap(lat, lng){
    loc.lat = lat;
    loc.lng = lng;

    var latLng = new google.maps.LatLng(lat, lng);
    map.setCenter(latLng);
    map.setZoom(10);
  }
})();
