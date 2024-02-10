const mongoose = require("mongoose");
const Sale = require("../models/sale");
const Category = require("../models/category");

module.exports = {
    show: (req, res, next) => {
        Category.find()
        .select("_id sale_date id_client products status total audit")
        .exec()
        .then((docs) => {
            const data = {
                count: docs.length,
                sales: docs.map((doc) => {
                    return {
                        _id: doc._id,
                        sale_date: doc.sale_date,
                        id_client: doc.id_client,
                        products: doc.products,
                        status: doc.status,
                        total: doc.total, 
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
                sale_date,
                id_client,
                products,
                status,
                total,
                audit 
            } = req.body;
            const sale = new Sale({
                _id: new mongoose.Types.ObjectId(),
                sale_date,
                id_client,
                products,
                status,
                total
            });
            await sale.save();
            res.status(201).json({
                code: 0,
                message: "Sale created",
                data: sale,
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
            const saleId = req.body.saleId;
            const updateOps = req.body;

            const { userId: userIdAuth } = req.userData;
            updateOps.updateBy = mongoose.Types.ObjectId(userIdAuth);
            updateOps.updateAt = new Date ();

            const updatedSale = await Sale.findByIdAndUpdate(
                saleId,
                { $set: updateOps },
                { new: true }
            );

            if (!updatedSale) {
                return res.status(400).json({
                    code: 400,
                    message: "Sale not found",
                    data: null
                });
            }
            res.status(200).json({
                code: 0,
                message: "Sale updated",
                data: updatedSale, 
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
            const saleId = req.params.saleId;
            const deletedSale = await Sale.findByIdAndRemove(saleId);
            if (!deletedSale) {
                return res.status(400).json({
                    code: 400,
                    message: "Sale not found",
                    data: null
                });
            }

            res.status(200).json({
                code: 0,
                message: "Sale deleted",
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
			const saleId = req.params.saleId;
			const sale = await Sale.findById(saleId);

			if (!sale) {
				res.status(400).json({
					code: 4,
					message: "Sale not found with id ${saleId}",
					data: null
				});
			} else {
				res.status(200).json({
					code: 0,
					message: "Sale found",
					data: sale,
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
	}  
};
