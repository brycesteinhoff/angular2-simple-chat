var jwt = require('jsonwebtoken');

var config = require('../config');
var dbService = require('../services/db');

var login = function(req, res)
{
	var token = '';

	// TO-DO: Implement registered user login
		// Check if nick is registered
		// If registered, attempt to authenticate
		// If not registered && request is guest && nick is not recently used, it's valid login
		// Generate JWT for valid logins and send
		// Send error if not valid login

	// For now just assume selected nick is valid as long as it isn't recently used
	dbService.isNickRecent(req.body.nick)
	.then(function(count)
	{
		if (count > 0) {
			res.status(406).send('Nickname \'' + req.body.nick + '\' has been used too recently.');
		} else {
			// Issue token
			token = jwt.sign({ nick: req.body.nick, guest: true }, config.auth.jwtSecret);
			res.status(200).json({ success: true, token: token });
		}
	});
};

var logout = function(req, res)
{
	// Just destroying jwt on client-side for now
	res.status(200).json({ success: true });
};

module.exports = {
	login: login,
	logout: logout
};