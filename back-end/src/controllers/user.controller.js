const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const defaultPicture = 'profilePictures\\default.jpeg';
const User = require('../models/user');
const jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');

module.exports = {
	show: (req,res,next)=>{
		User.find()
			.select('_id email password')

			.exec()
			.then(docs =>{
				const data = {
					count: docs.length,
					users: docs.map(doc=>{
						return{
							_id: doc._id,
							email: doc.email,
							password: doc.password
						}
					})
				};
				const response = {
					code: 0,
					message: '',
					data
				}
				res.status(200).json(response);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error:err
				});
			});		
	}
}