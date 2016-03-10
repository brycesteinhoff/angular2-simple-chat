var dbService = require('../services/db');

module.exports = function(ioServer)
{

	// Handle websocket connections
	ioServer.on('connection', function(socket)
	{
		var nick = socket.decoded_token.nick;

		var guest = socket.decoded_token.guest;

		// Incoming chat message
		socket.on('chat-message', function(data)
		{
			// Emit message to all connections in room
			ioServer.to(data.room).emit('chat-message', {
				message: data.message,
				room: data.room,
				nick: nick
			});

			// Save message in Mongo
			dbService.saveMessage({
				room: data.room,
				nick: nick,
				guest: guest,
				message: data.message
			});
		});

		// Socket joins room
		socket.on('room-join', function(data)
		{
			// Join room
			socket.join(data.room);

			// Get recent messages
			dbService.getRecentMessages(data.room)
			.then(function(messages)
			{
				messages.reverse();
				
				// Send each recent message out to this socket
				messages.forEach(function(message) {
					socket.emit('chat-message', {
						message: message.message,
						room: message.room,
						nick: message.nick
					});
				});
			});
		});

		// Socket leaves room
		socket.on('room-leave', function(data)
		{
			// Leave room
			socket.leave(data.room);
		});

		socket.on('disconnect', function(data) {});
	});

};