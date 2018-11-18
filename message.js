'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var MessageSchema = Schema({
	text: String,
	user: String,
	timestamp: {type: String, default: moment().format('DD-MM-YYYY h:mm a')}
}, {
    versionKey: false
});

module.exports = mongoose.model('Message', MessageSchema);