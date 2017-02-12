// app/models/tarea.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TareaSchema = new Schema({
	name: String,
	description: String
})

module.exports = mongoose.model('Tarea', TareaSchema);