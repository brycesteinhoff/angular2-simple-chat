var Message = require('../models/message');

// Return list of recently active rooms
var recent = function(req, res)
{
	var date = new Date();
	date.setSeconds(date.getSeconds() - 1200); // 20 minutes

	var rooms = Message.find({
		createdAt: { $gte: date }
	})
	.distinct('room')
	.exec(function(err, rooms)
	{
		if (err) {
			console.error('Error retrieving recently active rooms:', err);
		}

		res.status(200).json(rooms.reverse());
	});
};

module.exports = {
	recent: recent
};