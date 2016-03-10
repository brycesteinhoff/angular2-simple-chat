var expressJWT = require('express-jwt');

var jwtSecret = 'F6!8/94X6)d1Fu0@i2G*mr[5n$4E5%';

module.exports = {

	httpPort: 8080,

	db: 'angular2-simple-chat',

	auth: {
		jwtSecret: jwtSecret,

		// Invoke as callback to protect route
		protectRoute: function()
		{
			// The function returned by expressJWT() can be added
			// as callback on individual routes to protect them
			return expressJWT({
				secret: jwtSecret,
				requestProperty: 'decoded_token' // Decoded token will be available on req.decoded_token
			});
		}
	},

	// What is recent for the purposes of
	// chat backlog and recently used rooms?
	recentSeconds: 1200, // 20 minutes

}