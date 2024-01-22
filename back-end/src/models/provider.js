const mongoose = require('mongoose');


const providerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	company: {type: String, required: true},
    contactName: {type: String, required: true},
    contactTelephone: {type: String, required: true},
	createdBy : {type: mongoose.Schema.Types.ObjectId},
	createdAt: {type:Date, default: Date.now},
	updatedBy : {type: mongoose.Schema.Types.ObjectId},
	updatedAt: {type:Date},

});

module.exports = mongoose.model('Provider', providerSchema,'providers');

