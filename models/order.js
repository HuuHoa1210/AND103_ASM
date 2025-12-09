const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: ObjectId, ref: "user" },
    total: { type: Number },
    status: { type: String, default: "pending" },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.models.order || mongoose.model('order', orderSchema);
