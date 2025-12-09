const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
    id: { type: ObjectId },           // khóa chính (Mongoose vẫn tự có _id)
    name: { type: String },           // tên loại, ví dụ: "Điện thoại"
    code: { type: String }            // mã loại, ví dụ: "phone"
});

module.exports = mongoose.models.category || mongoose.model('category', categorySchema);
