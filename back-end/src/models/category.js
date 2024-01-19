const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true},
	image: {type: String, required: true},
	createdBy : {type: mongoose.Schema.Types.ObjectId},
	createdAt: {type:Date, default: Date.now},
	updatedBy : {type: mongoose.Schema.Types.ObjectId},
	updatedAt: {type:Date},

});

module.exports = mongoose.model('Category', categorySchema,'categories');

