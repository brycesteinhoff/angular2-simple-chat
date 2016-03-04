var express = require('express');
var methodOverride = require('method-override');
var http = require('http');
var path = require('path');

var app = new express();
var port = 8080;

// Config
app.use(methodOverride());
app.use(express.static('public'));

// Routes
app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/partials/:name', function(req, res)
{
	res.sendFile(__dirname + '/views/partials/' + req.params.name + '.html');
});

// Listen
http.createServer(app).listen(port, function()
{
	console.info("🌎  Listening on port %s", port);
});