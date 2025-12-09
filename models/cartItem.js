const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartItemSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: ObjectId, ref: "user" },
    productID: { type: ObjectId, ref: "product" },
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});

module.exports = mongoose.models.cartitem || mongoose.model('cartitem', cartItemSchema);
