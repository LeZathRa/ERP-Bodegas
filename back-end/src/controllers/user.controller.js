const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
	show: (req, res, next) => {
		User.find()
			.select(
				"_id email first_name last_name document_type document_number cellphone role image created_at updated_at"
			)
			.exec()
			.then((docs) => {
				const data = {
				count: docs.length,
				users: docs.map((doc) => {
					return {
					_id: doc._id,
					email: doc.email,
					firstName: doc.firstName,
					lastName: doc.lastName,
					documentType: doc.documentType,
					documentNumber: doc.documentNumber,
					cellphone: doc.cellphone,
					role: doc.role,
					image: doc.image,
					};
				}),
				};
				const response = {
					code: 0,
					message: "",
					data,
				};
				res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				code: 1,
				message: "Internal Server Error",
				data,
			});
		});
	},
	create: async (req, res, next) => {
		try {
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
			const userExisting = await User.findOne({ email });
			if (userExisting) {
				return res.status(400).json({
					code: 3,
					message: "The email is already in use",
					data:null
				});
			}
			const passwordEncrypt = await bcrypt.hash(password, 10);
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
				code: 0,
				message: "User created",
				data: user,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				code: 1,
				message: "Internal server error",
				data: null
			});
		}
	},
	update: async (req, res, next) => {
		try {
			const userId = req.body.userId;
			const updateOps = req.body;
			delete updateOps.userId;
			delete updateOps.password;

			const updatedUser = await User.findByIdAndUpdate(
				{ _id: userId },
				{ $set: updateOps },
				{ new: true }
			);

			if (!updatedUser) {
				return res.status(400).json({
					code: 400,
					message: "User not found",
					data: null
				});
			}

			res.status(200).json({
				code: 0,
				message: "User updated",
				data: updatedUser,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				code: 1,
				message: "Internal server error",
				data: null
			});
		}
	},
	delete: async (req, res, next) => {
		try {
			const userId = req.params.userId;

			const deletedUser = await User.findByIdAndRemove(userId);

			if (!deletedUser) {
				return res.status(400).json({
					code: 400,
					message: "User not found",
					data: null
				});
			}

			res.status(200).json({
				code: 0,
				message: "User deleted",
				data: null,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				code: 1,
				message: "Internal server error",
				data: null
			});
		}
	},

	findOne: async (req, res) => {
		try {
			const userId = req.params.userId;
			const user = await User.findById(userId);

			if (!user) {
				res.status(400).json({
					code: 4,
					message: "User not found with id ${userId}",
					data: null
				});
			} else {
				res.status(200).json({
					code: 0,
					message: "User found",
					data: user,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({
				code: 1,
				message: "Internal server error",
				data: null
			});
		}
	},
};
