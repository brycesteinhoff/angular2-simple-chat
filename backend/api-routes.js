var config = require('./config');
var authHandlers = require('./handlers/auth');
var roomsHandlers = require('./handlers/rooms');

module.exports = function(app)
{

	// Auth
	app.post('/api/auth/login', authHandlers.login);
	app.get('/api/auth/logout', config.auth.protectRoute(), authHandlers.logout);

	// Rooms
	app.get('/api/rooms/recent', config.auth.protectRoute(), roomsHandlers.recent);

};