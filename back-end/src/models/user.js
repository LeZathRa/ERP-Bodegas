const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {type: String, required: true},
	password: {type: String, required: true},
	firstName:{type:String, required:true},
	lastName:{type:String, required:true},
	documentType: {type:String, required:true},
	documentNumber: {type:String, required:true},
	cellphone: {type:String, required:true},
	role: {type:String, required:true},
	image: {type:String},
	status: {type:String},
	createdBy : {type: mongoose.Schema.Types.ObjectId},
	createdAt: {type:Date, default: Date.now},
	updatedBy : {type: mongoose.Schema.Types.ObjectId},
	updatedAt: {type:Date},

});

module.exports = mongoose.model('User', userSchema,'users');

