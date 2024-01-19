const mongoose = require("mongoose");
const Category = require("../models/category");

module.exports = {
	show: (req, res, next) => {
		Category.find()
			.select(
				"_id name image"
			)
			.exec()
			.then((docs) => {
				const data = {
				count: docs.length,
				categories: docs.map((doc) => {
					return {
					_id: doc._id,
					name: doc.name,
                    image: doc.image
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
                image
			} = req.body;
			const categoryExisting = await Category.findOne({ name });
			if (categoryExisting) {
				return res.status(400).json({
                    code: 3,
                    message: "The name is already in use",
                    data: null
				});
			}
			const category = new Category({
				_id: new mongoose.Types.ObjectId(),
                name,
                image,
			});
			await category.save();
			res.status(201).json({
				code: 0,
				message: "Category created",
				data: category,
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
            const categoryId = req.body.categoryId;
            const updateOps = req.body;
            delete updateOps.categoryId;

            const updatedCategory = await Category.findByIdAndUpdate(
                { _id: categoryId },
                { $set: updateOps },
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(400).json({
                    code: 3,
                    message: "Category not found",
                    data: null
                });
            }

            res.status(200).json({
                code: 0,
                message: "Category updated",
                data: updatedCategory,
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
			const categoryId = req.params.categoryId;

			const deletedCategory = await Category.findByIdAndRemove(categoryId);

			if (!deletedCategory) {
				return res.status(400).json({
                    code: 3,
                    message: "Category not found",
                    data: null
				});
			}

			res.status(200).json({
				code: 0,
				message: "Category deleted",
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
			const categoryId = req.params.categoryId;
			const category = await Category.findById(categoryId);

			if (!category) {
                    res.status(400).json({
                    code: 3,
                    message: "Category not found with id ${userId}",
                    data: null
				});
			} else {
				res.status(200).json({
                    code: 0,
                    message: "Categorya found",
                    data: category,
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
