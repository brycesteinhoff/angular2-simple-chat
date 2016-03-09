var express = require('express');
var http = require('http');
var io = require('socket.io');
var ioJwt = require('socketio-jwt');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
var apiRoutes = require('./api-routes');

// Bootstrap
var app = new express();
var httpServer = http.createServer(app);
var ioServer = new io(httpServer);

// Parse body for JSON
app.use(bodyParser.json());

// Public directory
app.use(express.static(path.resolve(__dirname + '/../public')));

// API routes
apiRoutes(app);

// Partials route
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
mongoose.connect('mongodb://localhost/' + config.db);
// Should check to make sure db connected successfully

// Listen
httpServer.listen(config.httpPort, function()
{
	console.info("🌎  Listening on port %s", config.httpPort);
});

// Require JWT authorization for websocket connections
ioServer.use(ioJwt.authorize({
	secret: config.auth.jwtSecret,
	handshake: true
}));

// Handle websocket connections
ioServer.on('connection', function(socket)
{
	socket.on('chat-message', function(data)
	{
		console.log('chat-message event:', data);

		// Emit message to all connections
		ioServer.emit('chat-message', {
			message: data.message,
			nick: socket.decoded_token.nick
		});
	});

	socket.on('disconnect', function(data)
	{
	});
});