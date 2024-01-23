const mongoose = require("mongoose");
const Product = require("../models/product");
const jwt = require('jsonwebtoken');

module.exports = {
	show: (req, res, next) => {
		Product.find()
			.select(
				"_id name stock price"
			)
			.exec()
			.then((docs) => {
				const data = {
				count: docs.length,
				products: docs.map((doc) => {
					return {
					_id: doc._id,
					name: doc.name,
                    stock: doc.stock,
                    price: doc.price.toString()
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
			error: err,
			});
		});
	},
	create: async (req, res, next) => {
		try {
			const {
				name,
                description,
                stock,
                price,
                providerId,
                categoryId
			} = req.body;
			const { userId: userIdAuth }= req.userData
			const productExisting = await Product.findOne({ name });
			if (productExisting) {
				return res.status(400).json({
                    code: 3,
                    message: "The name is already in use",
                    data: null
				});
			}
			const product = new Product({
				_id: new mongoose.Types.ObjectId(),
                name,
                description,
                stock,
                price,
                providerId,
                categoryId,
				createdBy: mongoose.Types.ObjectId(),
				createdAt: new Date()
			});
			await product.save();
            product.price = price.toString();
			res.status(201).json({
				code: 0,
				message: "Product created",
				data: product,
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
            const productId = req.body.productId;
            const updateOps = req.body;
			const { userId: usertIdAuth } = req.productData;
			updateOps.updateBy = mongoose.Types.ObjectId(userIdAuth);
			updateOps.updateAt = new Date();
            delete updateOps.productId;
            delete updateOps.createdBy;


            const updatedProduct = await Product.findByIdAndUpdate(
                { _id: productId },
                { $set: updateOps },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(400).json({
                    code: 3,
                    message: "Product not found",
                    data: null
                });
            }

            res.status(200).json({
                code: 0,
                message: "Product updated",
                data: updatedProduct,
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
			const productId = req.params.productId;

			const deletedProduct = await Product.findByIdAndRemove(productId);

			if (!deletedProduct) {
				return res.status(400).json({
                    code: 3,
                    message: "Product not found",
                    data: null
				});
			}

			res.status(200).json({
				code: 0,
				message: "Product deleted",
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
			const productId = req.params.productId;
			const product = await Product.findById(productId);

			if (!product) {
                    res.status(400).json({
                    code: 3,
                    message: "Product not found with id ${userId}",
                    data: null
				});
			} else {
				res.status(200).json({
                    code: 0,
                    message: "Product found",
                    data: product,
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
