var express = require('express');
var http = require('http');
var io = require('socket.io');
var ioJwt = require('socketio-jwt');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
var apiRoutes = require('./api-routes');
var chat = require('./handlers/chat');

// Bootstrap
console.log('Booting up');
var app = new express();
var httpServer = http.createServer(app);
var ioServer = new io(httpServer);

// Parse body for JSON
app.use(bodyParser.json());

console.log('Setting up routes');

// Public directory
app.use(express.static(path.resolve(__dirname + '/../public')));

// API routes
apiRoutes(app);

// Partials route
// Probably don't need this after all
// app.get('/partials/:name', function(req, res)
// {	
// 	res.sendFile(path.resolve(__dirname + '/../app/views/partials/' + req.params.name + '.html'));
// });

// Main app route
app.get('*', function(req, res)
{
	res.sendFile(path.resolve(__dirname + '/../app/views/index.html'));
});

// Connect to database
console.log('Connecting to MongoDB database');
mongoose.connect('mongodb://localhost/' + config.db);
mongoose.connection.on('connected', function()
{
	console.log('Mongoose connected to ' + config.db + ' database');
});
mongoose.connection.on('error', function(err)
{
	console.log('Mongoose connection error:', err);
});

console.log('Configuring socket.io');

// Require JWT authorization for websocket connections
ioServer.use(ioJwt.authorize({
	secret: config.auth.jwtSecret,
	handshake: true
}));

// Websocket handling
chat(ioServer);

// Listen
httpServer.listen(config.httpPort, function()
{
	console.info("🌎  Listening on port %s", config.httpPort);
});