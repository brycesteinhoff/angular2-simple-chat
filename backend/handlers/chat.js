var Message = require('../models/message');

// There's a lot going on in here...
// Need to split this up and organize it better

module.exports = function(ioServer)
{

	// Handle websocket connections
	ioServer.on('connection', function(socket)
	{
		var nick = socket.decoded_token.nick;

		var guest = socket.decoded_token.guest;

		socket.on('chat-message', function(data)
		{
			// Emit message to all connections in room
			ioServer.to(data.room).emit('chat-message', {
				message: data.message,
				room: data.room,
				nick: nick
			});

			// Save message in Mongo
			var message = new Message({
				room: data.room,
				nick: nick,
				guest: guest,
				message: data.message
			});

			message.save(function(err, message)
			{
				if (err) {
					console.error('Error saving message:', err);
				}
			});
		});

		socket.on('room-join', function(data)
		{
			// Join room
			socket.join(data.room);

			// Get recent messages
			var date = new Date();
			date.setSeconds(date.getSeconds() - 1200); // 20 minutes

			Message.find({
				room: data.room,
				createdAt: { $gte: date }
			})
			.limit(15)
			.sort('createdAt')
			.exec(function(err, messages)
			{
				if (err) {
					console.error('Error retrieving recent messages:', err);
				}

				// Send each recent message out to this socket
				messages.forEach(function(element, index, array) {
					socket.emit('chat-message', {
						message: element.message,
						room: element.room,
						nick: element.nick
					});
				});
			});
		});

		socket.on('room-leave', function(data)
		{
			// Leave room
			socket.leave(data.room);
		});

		socket.on('disconnect', function(data) {});
	});

};