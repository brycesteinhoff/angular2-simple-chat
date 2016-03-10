var dbService = require('../services/db');

// Return list of recently active rooms
var recent = function(req, res)
{
	dbService.getRecentRooms()
	.then(function(rooms)
	{
		res.status(200).json(rooms.reverse());
	});
};

module.exports = {
	recent: recent
};