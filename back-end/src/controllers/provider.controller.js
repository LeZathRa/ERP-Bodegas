const mongoose = require("mongoose");
const Provider = require("../models/provider");

module.exports = {
	show: (req, res, next) => {
		Provider.find()
			.select(
				"_id company contactName contactTelephone"
			)
			.exec()
			.then((docs) => {
				const data = {
                    count: docs.length,
                    providers: docs.map((doc) => {
                        return {
                        _id: doc._id,
                        company: doc.company,
                        contactName: doc.contactName,
                        contactTelephone: doc.contactTelephone
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
				company,
                contactName,
                contactTelephone
			} = req.body;
            const { userId: userIdAuth } = req.userData
			const providerExisting = await Provider.findOne({ company });
			if (providerExisting) {
				return res.status(400).json({
                    code: 3,
                    message: "The company is already in use",
                    data: null
				});
			}
			const provider = new Provider({
				_id: new mongoose.Types.ObjectId(),
                company,
                contactName,
                contactTelephone,
                createdBy: mongoose.Types.ObjectId(userIdAuth),
                createdAt: new Date()
			});
			await provider.save();
			res.status(201).json({
				code: 0,
				message: "Provider created",
				data: provider,
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
            const providerId = req.body.providerId;
            const { userId: userIdAuth } = req.userData
            const updateOps = req.body;
            updateOps.updatedBy = mongoose.Types.ObjectId(userIdAuth);
            updateOps.updatedAt = new Date()
            delete updateOps.providerId;
            
            const updatedProvider = await Provider.findByIdAndUpdate(
                { _id: providerId },
                { $set: updateOps },
                { new: true }
            );

            if (!updatedProvider) {
                return res.status(400).json({
                    code: 3,
                    message: "Provider not found",
                    data: null
                });
            }

            res.status(200).json({
                code: 0,
                message: "Provider updated",
                data: updatedProvider,
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
			const providerId = req.params.providerId;

			const deletedProvider = await Provider.findByIdAndRemove(providerId);

			if (!deletedProvider) {
				return res.status(400).json({
                    code: 3,
                    message: "Provider not found",
                    data: null
				});
			}

			res.status(200).json({
				code: 0,
				message: "Provider deleted",
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
			const providerId = req.params.providerId;
			const provider = await Provider.findById(providerId);

			if (!provider) {
                    res.status(400).json({
                    code: 3,
                    message: "Provider not found with id ${userId}",
                    data: null
				});
			} else {
				res.status(200).json({
                    code: 0,
                    message: "Provider found",
                    data: provider,
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
