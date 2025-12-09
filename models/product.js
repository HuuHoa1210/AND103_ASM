const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    status: { type: Boolean },
    cateID: { type: ObjectId, ref: "category" }
});

module.exports = mongoose.models.product || mongoose.model('product', productSchema);
