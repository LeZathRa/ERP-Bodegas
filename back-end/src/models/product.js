const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true},
    description: {type: String },
    price: {type: mongoose.Schema.Types.Decimal128, required: true},
    stock: {type: Number, required: true},
    providerId : {type: mongoose.Schema.Types.ObjectId},
    categoryId : {type: mongoose.Schema.Types.ObjectId},
	createdBy : {type: mongoose.Schema.Types.ObjectId},
	createdAt: {type:Date, default: Date.now},
	updatedBy : {type: mongoose.Schema.Types.ObjectId},
	updatedAt: {type:Date},

});

productSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.price = ret.price.toString();
      return ret;
    },
});

module.exports = mongoose.model('Product', productSchema,'products');

