'use strict';

module.exports = Query;
var artists = global.nss.db.collection('artists');

function Query(){
}

Query.execute = function(query, fn){
  var lat = query.loc.lat * 1;
  var lng = query.loc.lng * 1;
  var oneMile = 0.000012;
  var maxdistance = query.distance * oneMile;

  artists.find({'skills':{$in:query.skills}, 'coordinates':{$nearSphere:[lat, lng],$maxDistance:maxdistance}}).toArray(function(err, records){
    fn(records);
  });
};

Query.card = function(query, fn){
  artists.findOne({email:query.email}, function(err, record){
    fn(record);
  });
};
