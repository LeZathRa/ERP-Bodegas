const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const defaultPicture = 'profilePictures\\default.jpeg';
const User = require('../models/user');
const jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');

module.exports = {
	show: (req,res,next)=>{
		User.find()
        .select('_id email first_name last_name document_type document_number cellphone role image created_at updated_at')

			.exec()
			.then(docs =>{
				const data = {
					count: docs.length,
					users: docs.map(doc=>{
						return{
							_id: doc._id,
							email: doc.email,
							firstName: doc.firstName,
							lastName: doc.lastName,
							documentType: doc.documentType,
							documentNumber: doc.documentNumber,
							cellphone: doc.cellphone,
							role: doc.role,
							image:doc.image,
							
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
		},
		create: async (req, res, next)=>{
			try{
				const {

					firstName,
					lastName,
					documentType,
					documentNumber,
					cellphone,
					email,
					role,
					password,
					image,
				} = req.body;
				const userExisting = await User.findOne({email});
				if(userExisting){
					return res.status(400).json({
						code:1,
						message: 'The email is already in use',

					});
				}
			const passwordEncrypt = await bcrypt.hash(password,10)
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				email,
				password: passwordEncrypt,
				firstName,
				lastName,
				documentType,
				documentNumber,
				cellphone,
				role,
				image,

			});
			await user.save();
			res.status(201).json({
				code:0,
				message:'User created',
				data: user,

			});

		}catch (error) {
            console.log(error);
            res.status(500).json({
                code: 2,
                message: 'Internal server error',
            });
        }
    },
		update: async (req, res, next) => {
			try {
				const userId = req.body.userId;
				const updateOps = req.body;
				delete updateOps.userId;
				delete updateOps.password;
	
				const updatedUser = await User.findByIdAndUpdate({_id: userId}, { $set: updateOps }, { new: true });
	
				if (!updatedUser) {
					return res.status(404).json({
						code: 404,
						message: 'User not found',
					});
				}
	
				res.status(200).json({
					code: 0,
					message: 'User updated',
					data: updatedUser,
				});
			} catch (error) {
				console.log(error);
				res.status(500).json({
					code: 500,
					message: 'Internal server error',
				});
			}
		},
		delete: async (req, res, next) => {
			try {
				const userId = req.params.userId; 
	
				const deletedUser = await User.findByIdAndRemove(userId);
	
				if (!deletedUser) {
					return res.status(404).json({
						code: 404,
						message: 'User not found',
					});
				}
	
				res.status(200).json({
					code: 0,
					message: 'User deleted',
					data: null,
				});
			} catch (error) {
				console.log(error);
				res.status(500).json({
					code: 500,
					message: 'Internal server error',
				});
			}
		},

		findOne: async (req, res)=>{
			try{
				
					const userId = req.params.userId; 
					const user = await User.findById(userId);

					if(!user){
						res.status(404).json({
							code: 404,
							message: 'User not found with id ${userId}',
						});
					} else {
						res.status(200).json({
							code: 0,
							message: 'User found',
							data: user,
						})
					}
			} catch (error) {
				console.log(error);
				res.status(500).json({
					code: 2,
					message: 'Internal server error',
				});
			}

		},
		
	};

