var jwt = require('jsonwebtoken');

var config = require('../config');

var login = function(req, res)
{
	// Check if nick is registered

	// If registered, attempt to authenticate

	// If not registered && request is guest (req.body.guest == true), it's valid login
	// (And also check guest collisions?)

	// Generate JWT for valid logins and send
	// include issued at timestamp?

	// Send error if not valid login

	// For now just assume selected nick is valid
	var token = jwt.sign({ nick: req.body.nick, guest: true }, config.auth.jwtSecret);

	res.status(200).json(token);
};

var logout = function(req, res)
{
	// Maybe store logout timestamp on the user model
	// and check that token was issued after last logout?

	// What's best way to check this for guest logins though?
	// Guest database table??? Hmm

	// Or just destroy token on client side on logout?
	// Probably simplest but not most secure. Hmm
};

module.exports = {
	login: login,
	logout: logout
};