var Message = require('../models/message');
var config = require('../config');

// Construct "recent" date object
var _recentDate = function()
{
	var date = new Date();
	date.setSeconds(date.getSeconds() - config.recentSeconds);

	return date;
}

// Save message
var saveMessage = function(messageData)
{
	var message = new Message(messageData);

	message.save(function(err, message)
	{
		if (err) {
			console.error('Error saving message:', err);
		}
	});
};

// Get recent messages
var getRecentMessages = function(room)
{
	return Message.find({
		room: room,
		createdAt: { $gte: _recentDate() }
	})
	.limit(15)
	.sort('-createdAt')
	.exec();
};

// Get recently used rooms
var getRecentRooms = function()
{
	return Message.find({
		createdAt: { $gte: _recentDate() }
	})
	.distinct('room')
	.exec();
};

// Check if nick is recently active
var isNickRecent = function(nick)
{
	// TO-DO: Wrap this up in promise and return
	// boolean after Mongoose promise resolves.
	// Consumers don't need to know about count.

	return Message.count({
		nick: nick,
		createdAt: { $gte: _recentDate() }
	});
};

module.exports = {
	saveMessage: saveMessage,
	getRecentMessages: getRecentMessages,
	getRecentRooms: getRecentRooms,
	isNickRecent: isNickRecent
};