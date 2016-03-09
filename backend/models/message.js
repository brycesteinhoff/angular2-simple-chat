var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	room: String,
	nick: String,
	guest: Boolean,
	message: String
}, {
	timestamps: true
});

var Message = mongoose.model('Message', schema);

module.exports = Message;