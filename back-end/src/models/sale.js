const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sale_date: {type: Date, required: true},
    id_client: {type: String, required: true},
    products: {type: String, required: true},
    status: {type: String, required: true},
    total: {type: String, require: true},
    audit: {type: String, require: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId},
    createdAt: {type: Date},
    
});
module.exports = mongoose.model ('Sale', saleSchema, 'sales');