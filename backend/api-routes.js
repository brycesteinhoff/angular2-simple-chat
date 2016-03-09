var config = require('./config');
var authHandlers = require('./handlers/auth');

module.exports = function(app) {

	// Auth
	app.post('/api/auth/login', authHandlers.login);
	app.get('/api/auth/logout', config.auth.protectRoute(), authHandlers.logout);

};