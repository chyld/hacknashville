'use strict';

var dbname = process.env.DBNAME;
var port = process.env.PORT || 4000;

var express        = require('express');
var less           = require('express-less');
var session        = require('express-session');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var session        = require('cookie-session');
var initMongo      = require('./lib/init-mongo');
var initRoutes     = require('./lib/init-routes');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* --- pipeline begins */
app.use(initMongo.connect);
app.use(initRoutes);
app.use(morgan({format: 'dev'}));
app.use(express.static(__dirname + '/static'));
app.use('/less', less(__dirname + '/less'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({keys:['key1', 'key2']}));
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;
